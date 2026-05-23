package main

import "sync"

type wsClient struct {
	send chan []byte
}

type cursorHub struct {
	mu    sync.RWMutex
	rooms map[string]map[*wsClient]struct{}
}

var globalHub = &cursorHub{rooms: make(map[string]map[*wsClient]struct{})}

func (h *cursorHub) join(roomId string, c *wsClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.rooms[roomId] == nil {
		h.rooms[roomId] = make(map[*wsClient]struct{})
	}
	h.rooms[roomId][c] = struct{}{}
}

func (h *cursorHub) leave(roomId string, c *wsClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.rooms[roomId], c)
	if len(h.rooms[roomId]) == 0 {
		delete(h.rooms, roomId)
	}
}

func (h *cursorHub) broadcast(roomId string, sender *wsClient, msg []byte) {
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
