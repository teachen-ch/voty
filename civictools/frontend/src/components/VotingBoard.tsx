import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { pb } from "../pb";
import { canvasTransform, participantVotes, votingModal } from "../store";
import { renderMarkdown } from "../util/markdown";
import type { RecordModel } from "pocketbase";

interface Props {
  voting: RecordModel;
  isTeacher: boolean;
  currentParticipantId: string;
  mobile?: boolean;
}

const BOARD_WIDTH = 460;

interface VotingConfig {
  closed?: boolean;
  show_results?: boolean;
}

export function VotingBoard({
  voting,
  isTeacher,
  currentParticipantId,
  mobile = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);
  const [pos, setPos] = useState({
    x: voting.pos_x as number,
    y: voting.pos_y as number,
  });

  useEffect(() => {
    if (!drag.current) {
      setPos({ x: voting.pos_x as number, y: voting.pos_y as number });
    }
  }, [voting.pos_x, voting.pos_y]);

  const options: string[] = Array.isArray(voting.options)
    ? (voting.options as string[])
    : [];
  const config: VotingConfig =
    voting.config && typeof voting.config === "object"
      ? (voting.config as VotingConfig)
      : {};
  const closed = !!config.closed;
  const showResults = !!config.show_results;

  const votes = useMemo(
    () => participantVotes.value.filter((v) => v.voting === voting.id),
    [participantVotes.value, voting.id]
  );
  const myVote = votes.find((v) => v.participant === currentParticipantId);

  const counts = options.map(
    (_, i) => votes.filter((v) => (v.option as number) === i).length
  );
  const total = counts.reduce((a, b) => a + b, 0);

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
      ox: voting.pos_x as number,
      oy: voting.pos_y as number,
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
      .collection("votings")
      .update(voting.id, { pos_x: pos.x, pos_y: pos.y });
  }

  async function castVote(i: number) {
    if (closed || !currentParticipantId) return;
    try {
      if (myVote) {
        if ((myVote.option as number) === i) {
          await pb.collection("participant_votes").delete(myVote.id);
        } else {
          await pb
            .collection("participant_votes")
            .update(myVote.id, { option: i });
        }
      } else {
        await pb.collection("participant_votes").create({
          voting: voting.id,
          participant: currentParticipantId,
          option: i,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleClosed() {
    await pb
      .collection("votings")
      .update(voting.id, { config: { ...config, closed: !closed } });
  }

  async function toggleResults() {
    await pb.collection("votings").update(voting.id, {
      config: { ...config, show_results: !showResults },
    });
  }

  async function deleteVoting(e: MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this voting and all votes?")) return;
    await pb.collection("votings").delete(voting.id);
  }

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
          "flex items-start justify-between gap-2 px-3 py-2 border-b border-slate-200 rounded-t-xl bg-slate-50 " +
          (isTeacher && !mobile ? "cursor-grab" : "")
        }
      >
        <div className="flex-1 min-w-0 text-sm leading-snug flex items-center flex-wrap gap-x-2">
          {voting.prompt ? (
            <div
              className="[&>*]:inline [&>*]:m-0"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(voting.prompt as string),
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
                  votingModal.value = { voting };
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title="Edit voting"
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
                onClick={deleteVoting}
                onPointerDown={(e) => e.stopPropagation()}
                title="Delete voting"
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
          <div
            className={
              closed && !isTeacher ? "opacity-40 pointer-events-none" : ""
            }
          >
            {options.map((label, i) => {
              const isMine = (myVote?.option as number | undefined) === i;
              const count = counts[i];
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <button
                  key={i}
                  onClick={() => castVote(i)}
                  disabled={closed && !isTeacher}
                  className={
                    "relative w-full text-left px-3 py-2 rounded-lg border transition-colors overflow-hidden mb-2 " +
                    (isMine
                      ? "border-blue-400 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800") +
                    (closed ? " cursor-default" : " cursor-pointer")
                  }
                >
                  {showResults && (
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-100/60"
                      style={{ width: `${pct}%` }}
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-2 text-sm font-medium">
                    <span className="truncate">{label}</span>
                    {showResults && (
                      <span className="tabular-nums text-xs text-slate-600">
                        {count} · {pct}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
            <span>
              {total} vote{total === 1 ? "" : "s"}
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
                  {closed ? "Start voting" : "Close voting"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
