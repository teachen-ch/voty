import { useRef, useLayoutEffect } from "preact/hooks";
import { pb } from "../pb";
import {
  stickyNotes,
  canvasTransform,
  activeTool,
  discussionBoards,
  votings,
  timers,
  rankings,
} from "../store";
import { remoteCursors } from "../hooks/useCursors";
import { StickyNote } from "./StickyNote";
import { DiscussionBoard } from "./DiscussionBoard";
import { VotingBoard } from "./VotingBoard";
import { TimerBoard } from "./TimerBoard";
import { RankingBoard } from "./RankingBoard";

const NOTE_COLORS = [
  "#fef08a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecaca",
  "#e9d5ff",
  "#fed7aa",
];
const WORLD_SIZE = 32000;
const INIT_X = 3000;
const INIT_Y = 2000;

interface Props {
  roomId: string;
  participantId: string;
  isTeacher: boolean;
  stickyEnabled: boolean;
}

export function InfiniteCanvas({
  roomId,
  participantId,
  isTeacher,
  stickyEnabled,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{
    sx: number;
    sy: number;
    tx: number;
    ty: number;
  } | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current!;
    const { width, height } = el.getBoundingClientRect();
    canvasTransform.value = {
      x: width / 2 - INIT_X,
      y: height / 2 - INIT_Y,
      scale: 1,
    };

    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  function onPointerDown(e: PointerEvent) {
    if (activeTool.value !== "select") return;
    panRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      tx: canvasTransform.value.x,
      ty: canvasTransform.value.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!panRef.current) return;
    canvasTransform.value = {
      ...canvasTransform.value,
      x: panRef.current.tx + (e.clientX - panRef.current.sx),
      y: panRef.current.ty + (e.clientY - panRef.current.sy),
    };
  }

  function onPointerUp() {
    panRef.current = null;
  }

  function onWheel(e: WheelEvent) {
    const { x, y, scale } = canvasTransform.value;
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const ns = Math.max(0.1, Math.min(5, scale * factor));
    canvasTransform.value = {
      scale: ns,
      x: e.clientX - (e.clientX - x) * (ns / scale),
      y: e.clientY - (e.clientY - y) * (ns / scale),
    };
  }

  async function onClick(e: MouseEvent) {
    if (activeTool.value !== "sticky") return;
    if (!stickyEnabled && !isTeacher) return;
    if ((e.target as Element).closest("[data-note]")) return;
    const { x, y, scale } = canvasTransform.value;
    const wx = (e.clientX - x) / scale;
    const wy = (e.clientY - y) / scale;
    activeTool.value = "select";
    await pb.collection("sticky_notes").create({
      room: roomId,
      content: "",
      pos_x: wx,
      pos_y: wy,
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      participant: participantId,
    });
  }

  const { x, y, scale } = canvasTransform.value;
  const cursors = Array.from(remoteCursors.value.values());

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ cursor: activeTool.value === "sticky" ? "crosshair" : "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          width: `${WORLD_SIZE}px`,
          height: `${WORLD_SIZE}px`,
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          transformOrigin: "0 0",
          backgroundColor: "#f8f9fb",
          backgroundImage:
            "radial-gradient(circle, #c5cbd3 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      >
        {stickyNotes.value.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            isTeacher={isTeacher}
            currentParticipantId={participantId}
          />
        ))}
        {discussionBoards.value.map((board) => (
          <DiscussionBoard
            key={board.id}
            board={board}
            isTeacher={isTeacher}
            currentParticipantId={participantId}
          />
        ))}
        {votings.value.map((voting) => (
          <VotingBoard
            key={voting.id}
            voting={voting}
            isTeacher={isTeacher}
            currentParticipantId={participantId}
          />
        ))}
        {timers.value.map((timer) => (
          <TimerBoard key={timer.id} timer={timer} isTeacher={isTeacher} />
        ))}
        {rankings.value.map((ranking) => (
          <RankingBoard
            key={ranking.id}
            ranking={ranking}
            isTeacher={isTeacher}
            currentParticipantId={participantId}
          />
        ))}
      </div>

      {cursors.map((cur) => {
        if (cur.participantId === participantId) return null;
        return (
          <div
            key={cur.participantId}
            style={{
              position: "absolute",
              left: cur.x * scale + x,
              top: cur.y * scale + y,
              pointerEvents: "none",
              zIndex: 50,
              transform: "translate(-2px, -2px)",
            }}
          >
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              style={{ display: "block" }}
            >
              <path
                d="M3 2L3 16L6.5 11.5L9.5 17.5L11.5 16.5L8.5 10.5L14 10.5Z"
                fill={cur.color}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                display: "block",
                background: cur.color,
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: 4,
                marginTop: 2,
                whiteSpace: "nowrap",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              {cur.nickname}
            </span>
          </div>
        );
      })}
    </div>
  );
}
