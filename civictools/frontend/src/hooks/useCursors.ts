import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { canvasTransform, presence, type PresenceEntry } from "../store";

export interface RemoteCursor {
  participantId: string;
  nickname: string;
  x: number;
  y: number;
  color: string;
}

export const remoteCursors = signal<Map<string, RemoteCursor>>(new Map());

export function useCursors(
  roomId: string,
  participantId: string,
  nickname: string,
  color: string
) {
  useEffect(() => {
    if (!participantId || !roomId) return;

    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(
      `${proto}://${window.location.host}/ws/cursors/${roomId}`
    );

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "hello", participantId, nickname }));
    };

    ws.onmessage = (e: MessageEvent) => {
      try {
        const msg = JSON.parse(e.data as string);
        if (msg.type === "presence") {
          const clients = (msg.clients ?? []) as PresenceEntry[];
          presence.value = clients;
          // Drop lingering cursor dots for participants who have left.
          const present = new Set(clients.map((c) => c.participantId));
          const next = new Map(remoteCursors.value);
          for (const id of next.keys()) {
            if (!present.has(id)) next.delete(id);
          }
          remoteCursors.value = next;
        } else {
          const cur = msg as RemoteCursor;
          remoteCursors.value = new Map(remoteCursors.value).set(
            cur.participantId,
            cur
          );
        }
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onclose = () => {
      remoteCursors.value = new Map();
      presence.value = [];
    };

    let lastSent = 0;
    const sendCursor = (e: PointerEvent) => {
      if (ws.readyState !== WebSocket.OPEN) return;
      const now = Date.now();
      if (now - lastSent < 33) return;
      lastSent = now;
      const t = canvasTransform.value;
      ws.send(
        JSON.stringify({
          type: "cursor",
          participantId,
          nickname,
          x: (e.clientX - t.x) / t.scale,
          y: (e.clientY - t.y) / t.scale,
          color,
        })
      );
    };

    // pointermove fires even during setPointerCapture (e.g. while dragging a note),
    // whereas mousemove is suppressed by the browser during pointer capture.
    window.addEventListener("pointermove", sendCursor);

    return () => {
      window.removeEventListener("pointermove", sendCursor);
      remoteCursors.value = new Map();
      presence.value = [];
      ws.close();
    };
  }, [roomId, participantId]);
}
