import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { pb } from "../pb";
import { canvasTransform, rankingModal, rankingResponses } from "../store";
import { renderMarkdown } from "../util/markdown";
import type { RecordModel } from "pocketbase";

interface Props {
  ranking: RecordModel;
  isTeacher: boolean;
  currentParticipantId: string;
  mobile?: boolean;
}

interface RankingConfig {
  closed?: boolean;
  show_results?: boolean;
}

const BOARD_WIDTH = 460;

// Colors tied to original option index — consistent across all students/teacher
const RANK_COLORS = [
  "#4B96E8",
  "#8B5CF6",
  "#10B981",
  "#374151",
  "#D97706",
  "#EC4899",
  "#06B6D4",
  "#EF4444",
];

function optionColor(optIdx: number) {
  return RANK_COLORS[optIdx % RANK_COLORS.length];
}

function seededShuffle(length: number, seed: string): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0x7fffffff;
  }
  for (let i = indices.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) & 0x7fffffff;
    const j = hash % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

interface DragState {
  pointerId: number;
  optIdx: number;
  currentPos: number;
  // mutated in place so the window handlers always see latest order
  currentOrder: number[];
  listRect: DOMRect;
  itemH: number;
}

export function RankingBoard({
  ranking,
  isTeacher,
  currentParticipantId,
  mobile = false,
}: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const ghostLabelRef = useRef<HTMLSpanElement>(null);
  const ghostCircleRef = useRef<HTMLSpanElement>(null);
  const dragState = useRef<DragState | null>(null);

  const [collapsed, setCollapsed] = useState(false);
  const boardDrag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);
  const [pos, setPos] = useState({
    x: ranking.pos_x as number,
    y: ranking.pos_y as number,
  });

  useEffect(() => {
    if (!boardDrag.current)
      setPos({ x: ranking.pos_x as number, y: ranking.pos_y as number });
  }, [ranking.pos_x, ranking.pos_y]);

  const options: string[] = Array.isArray(ranking.options)
    ? (ranking.options as string[])
    : [];
  const config: RankingConfig =
    ranking.config && typeof ranking.config === "object"
      ? (ranking.config as RankingConfig)
      : {};
  const closed = !!config.closed;
  const showResults = !!config.show_results;

  const responses = useMemo(
    () => rankingResponses.value.filter((r) => r.ranking === ranking.id),
    [rankingResponses.value, ranking.id]
  );
  const myResponse = responses.find(
    (r) => r.participant === currentParticipantId
  );

  const initialOrder = useMemo(
    () => seededShuffle(options.length, currentParticipantId + ranking.id),
    [options.length, currentParticipantId, ranking.id]
  );

  const [order, setOrder] = useState<number[]>(initialOrder);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [draggingPos, setDraggingPos] = useState<number | null>(null);

  useEffect(() => {
    setOrder(initialOrder);
    setSubmitted(false);
  }, [options.length, ranking.id]);

  useEffect(() => {
    if (!myResponse) return;
    const saved = myResponse.order;
    if (Array.isArray(saved) && saved.length === options.length) {
      setOrder(saved as number[]);
      setSubmitted(true);
    }
  }, [myResponse?.id, options.length]);

  const canInteract =
    !isTeacher && !!currentParticipantId && !submitted && !closed;

  // ── Window-level drag handlers — registered once, always no-op unless dragState is set ──
  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const ds = dragState.current;
      if (!ds || e.pointerId !== ds.pointerId || !ghostRef.current) return;

      // Drag ghost freely along Y, shifted 20px right of the list
      ghostRef.current.style.top = `${e.clientY - ds.itemH / 2}px`;

      // Determine which slot the pointer is over
      const relY = e.clientY - ds.listRect.top;
      const newPos = Math.max(
        0,
        Math.min(ds.currentOrder.length - 1, Math.floor(relY / ds.itemH))
      );
      if (newPos !== ds.currentPos) {
        if (ghostCircleRef.current)
          ghostCircleRef.current.textContent = String(newPos + 1);
        const next = [...ds.currentOrder];
        const [moved] = next.splice(ds.currentPos, 1);
        next.splice(newPos, 0, moved);
        ds.currentOrder = next;
        ds.currentPos = newPos;
        setOrder(next);
        setDraggingPos(newPos);
      }
    }

    function handleUp(e: PointerEvent) {
      const ds = dragState.current;
      if (!ds || e.pointerId !== ds.pointerId) return;
      dragState.current = null;
      setDraggingPos(null);
      if (ghostRef.current) ghostRef.current.style.display = "none";
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, []);

  // ── Board drag (teacher repositions board on canvas) ──────────────────────
  function onHeaderPointerDown(e: PointerEvent) {
    if (mobile || !isTeacher) return;
    if ((e.target as Element).closest("[data-no-drag]")) return;
    e.stopPropagation();
    e.preventDefault();
    boardRef.current!.setPointerCapture(e.pointerId);
    boardDrag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: ranking.pos_x as number,
      oy: ranking.pos_y as number,
    };
  }
  function onBoardPointerMove(e: PointerEvent) {
    if (!boardDrag.current) return;
    const { scale } = canvasTransform.value;
    setPos({
      x: boardDrag.current.ox + (e.clientX - boardDrag.current.sx) / scale,
      y: boardDrag.current.oy + (e.clientY - boardDrag.current.sy) / scale,
    });
  }
  async function onBoardPointerUp() {
    if (!boardDrag.current) return;
    boardDrag.current = null;
    await pb
      .collection("rankings")
      .update(ranking.id, { pos_x: pos.x, pos_y: pos.y });
  }

  // ── Item drag start ───────────────────────────────────────────────────────
  function onItemPointerDown(e: PointerEvent, position: number) {
    if (!canInteract || !listRef.current || !ghostRef.current) return;
    // Don't start if this was a click on the submit button etc.
    if ((e.target as Element).closest("button")) return;
    e.stopPropagation();
    e.preventDefault();

    const listRect = listRef.current.getBoundingClientRect();
    const items =
      listRef.current.querySelectorAll<HTMLElement>("[data-rank-item]");
    const itemH =
      items.length > 0 ? items[0].getBoundingClientRect().height + 8 : 52;
    const optIdx = order[position];

    dragState.current = {
      pointerId: e.pointerId,
      optIdx,
      currentPos: position,
      currentOrder: [...order],
      listRect,
      itemH,
    };
    setDraggingPos(position);

    if (ghostLabelRef.current)
      ghostLabelRef.current.textContent = options[optIdx];
    if (ghostCircleRef.current) {
      ghostCircleRef.current.textContent = String(position + 1);
      ghostCircleRef.current.style.background = optionColor(optIdx);
    }
    // Offset 20px right of list, centered on cursor Y
    ghostRef.current.style.display = "flex";
    ghostRef.current.style.left = `${listRect.left + 20}px`;
    ghostRef.current.style.width = `${listRect.width}px`;
    ghostRef.current.style.top = `${e.clientY - itemH / 2}px`;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function submitRanking() {
    if (!currentParticipantId || submitting || submitted) return;
    setSubmitting(true);
    try {
      await pb.collection("ranking_responses").create({
        ranking: ranking.id,
        participant: currentParticipantId,
        order,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Teacher controls ──────────────────────────────────────────────────────
  async function toggleClosed() {
    await pb
      .collection("rankings")
      .update(ranking.id, { config: { ...config, closed: !closed } });
  }
  async function toggleResults() {
    await pb.collection("rankings").update(ranking.id, {
      config: { ...config, show_results: !showResults },
    });
  }
  async function deleteRanking(e: MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this ranking and all responses?")) return;
    await pb.collection("rankings").delete(ranking.id);
  }

  // ── Results computation ───────────────────────────────────────────────────
  const avgRanks = useMemo(
    () =>
      options.map((_, optIdx) => {
        if (responses.length === 0) return null;
        const sum = responses.reduce((acc, resp) => {
          const o = resp.order;
          if (!Array.isArray(o)) return acc;
          const p = (o as number[]).indexOf(optIdx);
          return p >= 0 ? acc + p + 1 : acc;
        }, 0);
        return sum / responses.length;
      }),
    [responses, options.length]
  );

  const sortedByAvg = useMemo(() => {
    if (!showResults || responses.length === 0) return null;
    return options
      .map((label, i) => ({ label, avg: avgRanks[i] ?? Infinity, i }))
      .sort((a, b) => a.avg - b.avg);
  }, [showResults, avgRanks, options]);

  return (
    <>
      {/* Ghost — fixed, follows pointer during drag */}
      <div
        ref={ghostRef}
        style={{
          position: "fixed",
          display: "none",
          zIndex: 9999,
          pointerEvents: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          borderRadius: "0.5rem",
          border: "1px solid #cbd5e1",
          background: "white",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.625rem 0.75rem",
          opacity: 0.92,
        }}
      >
        <span
          ref={ghostCircleRef}
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "white",
          }}
        />
        <span
          ref={ghostLabelRef}
          style={{ flex: 1, fontSize: 14, color: "#1e293b" }}
        />
      </div>

      {/* Board */}
      <div
        ref={boardRef}
        data-note="1"
        onPointerMove={onBoardPointerMove}
        onPointerUp={onBoardPointerUp}
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
        {/* Header */}
        <div
          onPointerDown={onHeaderPointerDown}
          className={
            "flex items-start justify-between gap-2 px-3 py-2 border-b border-slate-200 rounded-t-xl bg-slate-50 " +
            (isTeacher && !mobile ? "cursor-grab" : "")
          }
        >
          <div className="flex-1 min-w-0 text-sm leading-snug flex items-center flex-wrap gap-x-2">
            {ranking.question ? (
              <div
                className="[&>*]:inline [&>*]:m-0"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(ranking.question as string),
                }}
              />
            ) : (
              <span className="text-slate-400 italic">(no question)</span>
            )}
            {closed ? (
              <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 align-middle">
                Closed
              </span>
            ) : (
              <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 align-middle">
                Open
              </span>
            )}
          </div>
          <div className="shrink-0 flex items-center gap-1">
            {isTeacher && (
              <>
                <button
                  data-no-drag
                  onClick={(e) => {
                    e.stopPropagation();
                    rankingModal.value = { ranking };
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Edit ranking"
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
                  onClick={deleteRanking}
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Delete ranking"
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
            className="p-3 flex flex-col gap-2"
          >
            {/* Results view */}
            {showResults && sortedByAvg ? (
              <>
                {sortedByAvg.map(({ label, avg, i }, rank) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: optionColor(i) }}
                    >
                      {rank + 1}
                    </span>
                    <span className="flex-1 text-sm text-slate-800 truncate">
                      {label}
                    </span>
                    <span className="text-xs text-slate-400 tabular-nums">
                      avg {avg.toFixed(1)}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              /* Draggable list */
              <>
                <div
                  ref={listRef}
                  className={
                    "flex flex-col gap-2 " +
                    (closed && !isTeacher
                      ? "opacity-40 pointer-events-none"
                      : "")
                  }
                >
                  {order.map((optIdx, position) => {
                    const isDragging = draggingPos === position;
                    return (
                      <div
                        key={optIdx}
                        data-rank-item
                        onPointerDown={
                          canInteract
                            ? (e) => onItemPointerDown(e, position)
                            : undefined
                        }
                        className={
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors " +
                          (isDragging
                            ? "border-dashed border-slate-300 bg-slate-50 opacity-30"
                            : canInteract
                              ? "border-slate-200 bg-white cursor-grab active:cursor-grabbing"
                              : submitted
                                ? "border-slate-200 bg-slate-50"
                                : "border-slate-200 bg-white")
                        }
                      >
                        <span
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: optionColor(optIdx) }}
                        >
                          {position + 1}
                        </span>
                        <span className="flex-1 text-sm text-slate-800 truncate">
                          {options[optIdx]}
                        </span>
                        {submitted && (
                          <span className="text-xs text-slate-400">
                            your rank: {position + 1}
                          </span>
                        )}
                        {canInteract && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="currentColor"
                            className="text-slate-300 shrink-0"
                          >
                            <circle cx="4" cy="3" r="1.2" />
                            <circle cx="10" cy="3" r="1.2" />
                            <circle cx="4" cy="7" r="1.2" />
                            <circle cx="10" cy="7" r="1.2" />
                            <circle cx="4" cy="11" r="1.2" />
                            <circle cx="10" cy="11" r="1.2" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!isTeacher && !submitted && !closed && (
                  <button
                    onClick={submitRanking}
                    disabled={submitting}
                    className="mt-1 w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? "Submitting…" : "Submit ranking"}
                  </button>
                )}
                {!isTeacher && submitted && (
                  <p className="text-center text-xs text-slate-400 mt-1">
                    ✓ Ranking submitted
                  </p>
                )}
                {!isTeacher && closed && !submitted && (
                  <p className="text-center text-xs text-rose-400 mt-1">
                    This ranking is closed.
                  </p>
                )}
              </>
            )}

            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
              <span>
                {responses.length} student{responses.length === 1 ? "" : "s"}{" "}
                ranked
              </span>
              {isTeacher && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleResults}
                    className="text-slate-600 hover:text-slate-900 underline"
                  >
                    {showResults ? "Hide results" : "Show results"}
                  </button>
                  <button
                    onClick={toggleClosed}
                    className={
                      "underline " +
                      (closed
                        ? "text-emerald-600 hover:text-emerald-800"
                        : "text-rose-600 hover:text-rose-800")
                    }
                  >
                    {closed ? "Start ranking" : "Close ranking"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
