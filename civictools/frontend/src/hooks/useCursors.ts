import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { canvasTransform } from "../store";

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

    ws.onmessage = (e: MessageEvent) => {
      try {
        const msg = JSON.parse(e.data as string) as RemoteCursor;
        remoteCursors.value = new Map(remoteCursors.value).set(
          msg.participantId,
          msg
        );
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onclose = () => {
      remoteCursors.value = new Map();
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
      ws.close();
    };
  }, [roomId, participantId]);
}
