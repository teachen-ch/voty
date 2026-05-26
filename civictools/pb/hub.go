package main

import (
	"sync"
	"time"
)

type presenceEntry struct {
	ParticipantId string `json:"participantId"`
	Nickname      string `json:"nickname"`
}

type wsClient struct {
	send        chan []byte
	participant string
	nickname    string
}

type cursorHub struct {
	mu    sync.RWMutex
	rooms map[string]map[*wsClient]struct{}
	since map[string]time.Time
}

var globalHub = &cursorHub{
	rooms: make(map[string]map[*wsClient]struct{}),
	since: make(map[string]time.Time),
}

// join adds a client to a room and reports whether the room just went live
// (i.e. this is the first active connection).
func (h *cursorHub) join(roomId string, c *wsClient) (becameLive bool) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.rooms[roomId] == nil {
		h.rooms[roomId] = make(map[*wsClient]struct{})
	}
	becameLive = len(h.rooms[roomId]) == 0
	h.rooms[roomId][c] = struct{}{}
	if becameLive {
		h.since[roomId] = time.Now()
	}
	return becameLive
}

func (h *cursorHub) leave(roomId string, c *wsClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.rooms[roomId], c)
	if len(h.rooms[roomId]) == 0 {
		delete(h.rooms, roomId)
		delete(h.since, roomId)
	}
}

func (h *cursorHub) setIdentity(c *wsClient, participant, nickname string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	c.participant = participant
	c.nickname = nickname
}

// relay sends a message to everyone in the room except the sender.
func (h *cursorHub) relay(roomId string, sender *wsClient, msg []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for c := range h.rooms[roomId] {
		if c == sender {
			continue
		}
		select {
		case c.send <- msg:
		default:
		}
	}
}

// broadcastAll sends a message to every client in the room.
func (h *cursorHub) broadcastAll(roomId string, msg []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for c := range h.rooms[roomId] {
		select {
		case c.send <- msg:
		default:
		}
	}
}

// roster returns the distinct identified participants currently connected,
// collapsing multiple windows/tabs of the same participant into one.
func (h *cursorHub) roster(roomId string) []presenceEntry {
	h.mu.RLock()
	defer h.mu.RUnlock()
	seen := map[string]bool{}
	out := []presenceEntry{}
	for c := range h.rooms[roomId] {
		if c.participant == "" || seen[c.participant] {
			continue
		}
		seen[c.participant] = true
		out = append(out, presenceEntry{ParticipantId: c.participant, Nickname: c.nickname})
	}
	return out
}

type roomPresence struct {
	Online int   `json:"online"`
	Since  int64 `json:"since"` // unix ms of when the room went live, 0 if idle
}

func (h *cursorHub) presence(roomId string) roomPresence {
	h.mu.RLock()
	defer h.mu.RUnlock()
	seen := map[string]bool{}
	for c := range h.rooms[roomId] {
		if c.participant != "" {
			seen[c.participant] = true
		}
	}
	n := len(seen)
	if n == 0 {
		// Fall back to raw connections for clients that haven't identified
		// themselves yet, so a freshly opened room still reads as live.
		n = len(h.rooms[roomId])
	}
	if n == 0 {
		return roomPresence{}
	}
	return roomPresence{Online: n, Since: h.since[roomId].UnixMilli()}
}
