package main

import (
	"context"
	"strings"

	"github.com/pocketbase/pocketbase/core"
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
		globalHub.join(roomId, c)
		defer globalHub.leave(roomId, c)

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
			globalHub.broadcast(roomId, c, msg)
		}
	})
}
