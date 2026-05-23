import { useEffect, useRef, useState } from "preact/hooks";
import { pb } from "../pb";
import { canvasTransform, timerModal } from "../store";
import type { RecordModel } from "pocketbase";

interface Props {
  timer: RecordModel;
  isTeacher: boolean;
  mobile?: boolean;
}

const BOARD_WIDTH = 220;

function formatMMSS(total: number): string {
  const t = Math.max(0, Math.ceil(total));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseDate(v: unknown): number | null {
  if (!v) return null;
  if (typeof v !== "string") return null;
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : t;
}

export function TimerBoard({ timer, isTeacher, mobile = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);
  const [pos, setPos] = useState({
    x: timer.pos_x as number,
    y: timer.pos_y as number,
  });
  const [, tick] = useState(0);

  useEffect(() => {
    if (!drag.current) {
      setPos({ x: timer.pos_x as number, y: timer.pos_y as number });
    }
  }, [timer.pos_x, timer.pos_y]);

  const duration = (timer.duration_seconds as number) || 0;
  const started = parseDate(timer.started);
  const pausedAt = parseDate(timer.paused_at);
  const ended = parseDate(timer.ended);

  const running = started !== null && pausedAt === null && ended === null;
  const paused = started !== null && pausedAt !== null && ended === null;
  const stopped = ended !== null;
  const idle = started === null;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => tick((n) => n + 1), 250);
    return () => clearInterval(id);
  }, [running]);

  let remaining: number;
  if (idle) {
    remaining = duration;
  } else if (paused) {
    remaining = duration - (pausedAt! - started!) / 1000;
  } else if (stopped) {
    remaining = 0;
  } else {
    remaining = duration - (Date.now() - started!) / 1000;
  }
  const overdue = running && remaining <= 0;

  function onHeaderPointerDown(e: PointerEvent) {
    if (mobile) return;
    if (!isTeacher) return;
    if ((e.target as Element).closest("[data-no-drag]")) return;
    e.stopPropagation();
    e.preventDefault();
    ref.current!.setPointerCapture(e.pointerId);
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: timer.pos_x as number,
      oy: timer.pos_y as number,
    };
  }
  function onPointerMove(e: PointerEvent) {
    if (!drag.current) return;
    const { scale } = canvasTransform.value;
    setPos({
      x: drag.current.ox + (e.clientX - drag.current.sx) / scale,
      y: drag.current.oy + (e.clientY - drag.current.sy) / scale,
    });
  }
  async function onPointerUp() {
    if (!drag.current) return;
    drag.current = null;
    await pb
      .collection("timers")
      .update(timer.id, { pos_x: pos.x, pos_y: pos.y });
  }

  async function start() {
    await pb.collection("timers").update(timer.id, {
      started: new Date().toISOString(),
      paused_at: null,
      ended: null,
    });
  }

  async function pause() {
    await pb
      .collection("timers")
      .update(timer.id, { paused_at: new Date().toISOString() });
  }

  async function resume() {
    if (!started || !pausedAt) return;
    const newStarted = new Date(
      started + (Date.now() - pausedAt)
    ).toISOString();
    await pb.collection("timers").update(timer.id, {
      started: newStarted,
      paused_at: null,
    });
  }

  async function stop() {
    await pb.collection("timers").update(timer.id, {
      ended: new Date().toISOString(),
      paused_at: null,
    });
  }

  async function reset() {
    await pb.collection("timers").update(timer.id, {
      started: null,
      paused_at: null,
      ended: null,
    });
  }

  async function deleteTimer(e: MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this timer?")) return;
    await pb.collection("timers").delete(timer.id);
  }

  const display = formatMMSS(remaining);

  return (
    <div
      ref={ref}
      data-note="1"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={
        mobile
          ? "rounded-xl bg-white shadow-sm border border-slate-200 flex flex-col"
          : "absolute rounded-xl bg-white shadow-[3px_4px_14px_rgba(0,0,0,0.18)] border border-slate-200 select-none touch-none flex flex-col"
      }
      style={
        mobile
          ? undefined
          : { left: `${pos.x}px`, top: `${pos.y}px`, width: BOARD_WIDTH }
      }
    >
      <div
        onPointerDown={onHeaderPointerDown}
        className={
          "flex items-center justify-between gap-2 px-3 py-1.5 border-b border-slate-200 rounded-t-xl bg-slate-50 " +
          (isTeacher && !mobile ? "cursor-grab" : "")
        }
      >
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Timer
        </span>
        <div className="shrink-0 flex items-center gap-1">
          {isTeacher && (
            <>
              <button
                data-no-drag
                onClick={(e) => {
                  e.stopPropagation();
                  timerModal.value = { timer };
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title="Edit duration"
                className="text-slate-400 hover:text-blue-600 px-1"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                data-no-drag
                onClick={deleteTimer}
                onPointerDown={(e) => e.stopPropagation()}
                title="Delete timer"
                className="text-slate-400 hover:text-red-600 text-lg leading-none px-1"
              >
                ×
              </button>
            </>
          )}
          {mobile && (
            <button
              data-no-drag
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed((c) => !c);
              }}
              title={collapsed ? "Expand" : "Collapse"}
              className="text-slate-500 hover:text-slate-900 px-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 120ms",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {!collapsed && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="px-3 py-3 flex flex-col items-center gap-2"
        >
          <div
            className={
              "font-mono text-4xl tabular-nums font-semibold " +
              (overdue ? "text-rose-600 animate-pulse" : "text-slate-800")
            }
          >
            {display}
          </div>

          {isTeacher && (
            <div className="flex items-center gap-2">
              {idle && (
                <button
                  onClick={start}
                  className="px-3 py-1 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                >
                  Start
                </button>
              )}
              {running && (
                <>
                  <button
                    onClick={pause}
                    className="px-3 py-1 rounded bg-amber-500 text-white text-sm hover:bg-amber-600"
                  >
                    Pause
                  </button>
                  <button
                    onClick={stop}
                    className="px-3 py-1 rounded bg-rose-600 text-white text-sm hover:bg-rose-700"
                  >
                    Stop
                  </button>
                </>
              )}
              {paused && (
                <>
                  <button
                    onClick={resume}
                    className="px-3 py-1 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                  >
                    Resume
                  </button>
                  <button
                    onClick={stop}
                    className="px-3 py-1 rounded bg-rose-600 text-white text-sm hover:bg-rose-700"
                  >
                    Stop
                  </button>
                </>
              )}
              {stopped && (
                <button
                  onClick={reset}
                  className="px-3 py-1 rounded bg-slate-600 text-white text-sm hover:bg-slate-700"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
