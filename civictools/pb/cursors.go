package main

import (
	"context"
	"encoding/json"
	"strings"
	"time"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/router"
	"nhooyr.io/websocket"
)

func registerCursorWS(se *core.ServeEvent) {
	se.Router.GET("/ws/cursors/{roomId}", func(re *core.RequestEvent) error {
		roomId := re.Request.PathValue("roomId")
		if roomId == "" {
			// fallback for routers that don't support path values
			roomId = strings.TrimPrefix(re.Request.URL.Path, "/ws/cursors/")
		}

		conn, err := websocket.Accept(re.Response, re.Request, &websocket.AcceptOptions{
			InsecureSkipVerify: true,
		})
		if err != nil {
			return err
		}

		ctx, cancel := context.WithCancel(re.Request.Context())
		defer cancel()
		defer conn.CloseNow()

		c := &wsClient{send: make(chan []byte, 64)}
		if globalHub.join(roomId, c) {
			markRoomActive(re.App, roomId)
		}
		defer func() {
			globalHub.leave(roomId, c)
			globalHub.broadcastAll(roomId, presenceMsg(roomId))
		}()

		go func() {
			for {
				select {
				case msg := <-c.send:
					if conn.Write(ctx, websocket.MessageText, msg) != nil {
						cancel()
						return
					}
				case <-ctx.Done():
					return
				}
			}
		}()

		for {
			_, msg, err := conn.Read(ctx)
			if err != nil {
				return nil
			}
			handleCursorMessage(roomId, c, msg)
		}
	})

	// Realtime presence for the teacher dashboard: comma-separated room ids.
	se.Router.GET("/api/civictools/presence", func(re *core.RequestEvent) error {
		if re.Auth == nil {
			return router.NewUnauthorizedError("login required", nil)
		}
		out := map[string]roomPresence{}
		for _, id := range strings.Split(re.Request.URL.Query().Get("rooms"), ",") {
			if id = strings.TrimSpace(id); id != "" {
				out[id] = globalHub.presence(id)
			}
		}
		return re.JSON(200, out)
	}).Bind(apis.RequireAuth())
}

// handleCursorMessage processes one inbound WS frame: it learns the sender's
// identity (from a "hello" frame or the first cursor frame) and broadcasts the
// updated presence roster, then relays cursor frames to the other clients.
func handleCursorMessage(roomId string, c *wsClient, msg []byte) {
	var env struct {
		Type          string `json:"type"`
		ParticipantId string `json:"participantId"`
		Nickname      string `json:"nickname"`
	}
	_ = json.Unmarshal(msg, &env)

	if c.participant == "" && env.ParticipantId != "" {
		globalHub.setIdentity(c, env.ParticipantId, env.Nickname)
		globalHub.broadcastAll(roomId, presenceMsg(roomId))
	}
	if env.Type == "hello" {
		return // identity-only frame, nothing to relay
	}
	globalHub.relay(roomId, c, msg)
}

func presenceMsg(roomId string) []byte {
	b, _ := json.Marshal(struct {
		Type    string          `json:"type"`
		Clients []presenceEntry `json:"clients"`
	}{Type: "presence", Clients: globalHub.roster(roomId)})
	return b
}

// markRoomActive records when a room was last opened, so idle rooms can show
// "last opened ..." on the dashboard. Best-effort; failures are ignored.
func markRoomActive(app core.App, roomId string) {
	room, err := app.FindRecordById("rooms", roomId)
	if err != nil {
		return
	}
	room.Set("last_active", time.Now().UTC())
	_ = app.Save(room)
}
