import { useEffect, useRef, useState } from "preact/hooks";
import { pb } from "../pb";
import {
  participantCache,
  getParticipantName,
  canvasTransform,
  currentRoom,
} from "../store";
import type { RecordModel } from "pocketbase";

interface Props {
  note: RecordModel;
  isTeacher: boolean;
}

interface DragState {
  startX: number;
  startY: number;
  origX: number;
  origY: number;
}

interface ResizeState {
  startX: number;
  startY: number;
  origWidth: number;
  origHeight: number;
}

export function StickyNote({ note, isTeacher }: Props) {
  const locked = !isTeacher && !!currentRoom.value?.interactions_locked;
  const noteRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState | null>(null);
  const resize = useRef<ResizeState | null>(null);
  const resizeSize = useRef({
    width: (note.width as number) || 160,
    height: (note.height as number) || 120,
  });
  const [pos, setPos] = useState({
    x: note.pos_x as number,
    y: note.pos_y as number,
  });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!drag.current && !resize.current) {
      setPos({ x: note.pos_x as number, y: note.pos_y as number });
    }
  }, [note.pos_x, note.pos_y]);

  const [size, setSize] = useState({
    width: (note.width as number) || 160,
    height: (note.height as number) || 120,
  });

  useEffect(() => {
    if (!resize.current) {
      setSize({
        width: (note.width as number) || 160,
        height: (note.height as number) || 120,
      });
    }
  }, [note.width, note.height]);

  const pid = note.participant as string | undefined;
  useEffect(() => {
    if (pid && !participantCache.value.has(pid)) return;
    forceUpdate((n) => n + 1);
  }, [participantCache.value, pid]);

  function onPointerDown(e: PointerEvent) {
    if (locked || !isTeacher) return;
    e.stopPropagation();
    e.preventDefault();
    noteRef.current!.setPointerCapture(e.pointerId);
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: note.pos_x as number,
      origY: note.pos_y as number,
    };
  }

  function onPointerMove(e: PointerEvent) {
    if (!drag.current) return;
    const { scale } = canvasTransform.value;
    setPos({
      x: drag.current.origX + (e.clientX - drag.current.startX) / scale,
      y: drag.current.origY + (e.clientY - drag.current.startY) / scale,
    });
  }

  async function onPointerUp() {
    if (!drag.current) return;
    drag.current = null;
    await pb
      .collection("sticky_notes")
      .update(note.id, { pos_x: pos.x, pos_y: pos.y });
  }

  function onResizePointerDown(e: PointerEvent) {
    if (locked || !isTeacher) return;
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      origWidth: size.width,
      origHeight: size.height,
    };
    resizeSize.current = size;
  }

  function onResizePointerMove(e: PointerEvent) {
    if (!resize.current) return;
    const nextSize = {
      width: Math.max(
        120,
        resize.current.origWidth + e.clientX - resize.current.startX
      ),
      height: Math.max(
        90,
        resize.current.origHeight + e.clientY - resize.current.startY
      ),
    };
    resizeSize.current = nextSize;
    setSize(nextSize);
  }

  async function onResizePointerUp() {
    if (!resize.current) return;
    resize.current = null;
    const finalSize = resizeSize.current;
    await pb.collection("sticky_notes").update(note.id, {
      width: finalSize.width,
      height: finalSize.height,
    });
  }

  async function updateContent(content: string) {
    if (locked || !isTeacher) return;
    await pb.collection("sticky_notes").update(note.id, { content });
  }

  async function deleteNote(e: MouseEvent) {
    e.stopPropagation();
    await pb.collection("sticky_notes").delete(note.id);
  }

  return (
    <div
      ref={noteRef}
      data-note="1"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute p-2 rounded cursor-grab select-none touch-none flex flex-col gap-1 shadow-[2px_3px_8px_rgba(0,0,0,0.15)]"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        background: note.color as string,
      }}
    >
      <textarea
        value={note.content as string}
        readOnly={locked || !isTeacher}
        onInput={(e) => updateContent(e.currentTarget.value)}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder="Type here…"
        className="flex-1 bg-transparent border-0 resize-none text-[13px] p-0 min-h-17.5 cursor-text focus:outline-none"
        style={{ font: "inherit" }}
      />
      {isTeacher && (
        <button
          onClick={deleteNote}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs rounded bg-black/10 hover:bg-black/20"
          aria-label="Delete note"
        >
          ×
        </button>
      )}
      <div className="flex justify-between items-center">
        <small className="opacity-60 text-[11px]">
          {getParticipantName(note.participant as string)}
        </small>
      </div>
      <div
        aria-label="Resize note"
        onPointerDown={onResizePointerDown}
        onPointerMove={onResizePointerMove}
        onPointerUp={onResizePointerUp}
        onPointerCancel={onResizePointerUp}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
      />
    </div>
  );
}
