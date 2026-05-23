import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { pb } from "../pb";
import {
  argumentRecords,
  argumentVotes,
  canvasTransform,
  discussionModal,
  getParticipantName,
} from "../store";
import { renderMarkdown } from "../util/markdown";
import type { RecordModel } from "pocketbase";

interface Props {
  board: RecordModel;
  isTeacher: boolean;
  currentParticipantId: string;
  mobile?: boolean;
}

const BOARD_WIDTH = 520;

export function DiscussionBoard({
  board,
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
    x: board.pos_x as number,
    y: board.pos_y as number,
  });
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [promptDraft, setPromptDraft] = useState(
    (board.prompt as string) ?? ""
  );

  useEffect(() => {
    if (!drag.current) {
      setPos({ x: board.pos_x as number, y: board.pos_y as number });
    }
    if (!editingPrompt) setPromptDraft((board.prompt as string) ?? "");
  }, [board.pos_x, board.pos_y, board.prompt]);

  const args = useMemo(
    () => argumentRecords.value.filter((a) => a.discussion_board === board.id),
    [argumentRecords.value, board.id]
  );

  const rawOptions = board.options;
  const options: string[] = Array.isArray(rawOptions)
    ? (rawOptions as string[])
    : ["Pro", "Contra"];

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
      ox: board.pos_x as number,
      oy: board.pos_y as number,
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
      .collection("discussion_boards")
      .update(board.id, { pos_x: pos.x, pos_y: pos.y });
  }

  async function savePrompt() {
    setEditingPrompt(false);
    if (promptDraft === (board.prompt as string)) return;
    await pb
      .collection("discussion_boards")
      .update(board.id, { prompt: promptDraft });
  }

  async function deleteBoard(e: MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this discussion board and all arguments?")) return;
    await pb.collection("discussion_boards").delete(board.id);
  }

  async function addArgument(optionIndex: number) {
    if (!currentParticipantId) return;
    await pb.collection("arguments").create({
      discussion_board: board.id,
      participant: currentParticipantId,
      option_index: optionIndex,
      text: "",
    });
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
        <div className="flex-1 min-w-0">
          {editingPrompt ? (
            <textarea
              data-no-drag
              autoFocus
              value={promptDraft}
              onPointerDown={(e) => e.stopPropagation()}
              onInput={(e) => setPromptDraft(e.currentTarget.value)}
              onBlur={savePrompt}
              placeholder="Discussion prompt (markdown supported)…"
              className="w-full bg-white border border-slate-300 rounded p-2 text-sm resize-y min-h-16 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          ) : (
            <div
              data-no-drag={isTeacher ? "1" : undefined}
              onClick={() => isTeacher && setEditingPrompt(true)}
              className={
                "text-sm leading-snug prose-sm " +
                (isTeacher ? "cursor-text" : "")
              }
            >
              {board.prompt ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(board.prompt as string),
                  }}
                />
              ) : (
                <span className="text-slate-400 italic">
                  {isTeacher
                    ? "Click to set discussion prompt…"
                    : "(no prompt yet)"}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1">
          {isTeacher && (
            <>
              <button
                data-no-drag
                onClick={(e) => {
                  e.stopPropagation();
                  discussionModal.value = { board };
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title="Edit prompt & options"
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
                onClick={deleteBoard}
                onPointerDown={(e) => e.stopPropagation()}
                title="Delete board"
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
          className="grid gap-px bg-slate-200"
          style={{
            gridTemplateColumns: mobile
              ? "minmax(0, 1fr)"
              : `repeat(${options.length}, minmax(0, 1fr))`,
          }}
        >
          {options.map((label, i) => (
            <ArgumentColumn
              key={i}
              title={label || `Option ${i + 1}`}
              toneIndex={i}
              args={args.filter((a) => (a.option_index as number) === i)}
              onAdd={() => addArgument(i)}
              currentParticipantId={currentParticipantId}
              isTeacher={isTeacher}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ColProps {
  title: string;
  toneIndex: number;
  args: RecordModel[];
  onAdd: () => void;
  currentParticipantId: string;
  isTeacher: boolean;
}

const COLUMN_TONES = [
  { bg: "bg-emerald-50", text: "text-emerald-700" },
  { bg: "bg-rose-50", text: "text-rose-700" },
  { bg: "bg-sky-50", text: "text-sky-700" },
  { bg: "bg-amber-50", text: "text-amber-700" },
];

function ArgumentColumn({
  title,
  toneIndex,
  args,
  onAdd,
  currentParticipantId,
  isTeacher,
}: ColProps) {
  const tone = COLUMN_TONES[toneIndex % COLUMN_TONES.length];
  const headerBg = tone.bg;
  const headerText = tone.text;

  return (
    <div className="bg-white flex flex-col min-h-[120px]">
      <div
        className={`flex items-center justify-between px-3 py-1.5 ${headerBg} ${headerText} font-semibold text-xs uppercase tracking-wide`}
      >
        <span>{title}</span>
        <button
          data-no-drag
          onClick={onAdd}
          onPointerDown={(e) => e.stopPropagation()}
          title={`Add ${title.toLowerCase()} argument`}
          className="size-6 rounded-full bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-200 flex items-center justify-center text-base leading-none"
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-1.5 p-2">
        {args.length === 0 && (
          <div className="text-[11px] text-slate-400 italic">
            No arguments yet.
          </div>
        )}
        {args.map((a) => (
          <ArgumentCard
            key={a.id}
            arg={a}
            currentParticipantId={currentParticipantId}
            isTeacher={isTeacher}
          />
        ))}
      </div>
    </div>
  );
}

function ArgumentCard({
  arg,
  currentParticipantId,
  isTeacher,
}: {
  arg: RecordModel;
  currentParticipantId: string;
  isTeacher: boolean;
}) {
  const isOwner = arg.participant === currentParticipantId;
  const [editing, setEditing] = useState(
    (arg.text as string) === "" && isOwner
  );
  const [draft, setDraft] = useState((arg.text as string) ?? "");
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setOverflowing(el.scrollHeight - el.clientHeight > 1);
  }, [arg.text, editing, expanded]);

  useEffect(() => {
    if (!editing) setDraft((arg.text as string) ?? "");
  }, [arg.text]);

  const votes = useMemo(
    () => argumentVotes.value.filter((v) => v.argument === arg.id),
    [argumentVotes.value, arg.id]
  );
  const myVote = votes.find((v) => v.participant === currentParticipantId);

  async function saveText() {
    setEditing(false);
    if (draft === (arg.text as string)) return;
    await pb.collection("arguments").update(arg.id, { text: draft });
  }

  async function deleteArg(e: MouseEvent) {
    e.stopPropagation();
    await pb.collection("arguments").delete(arg.id);
  }

  async function toggleVote(e: MouseEvent) {
    e.stopPropagation();
    if (!currentParticipantId) return;
    if (myVote) {
      await pb.collection("argument_votes").delete(myVote.id);
    } else {
      await pb.collection("argument_votes").create({
        argument: arg.id,
        participant: currentParticipantId,
      });
    }
  }

  return (
    <div
      data-no-drag
      onPointerDown={(e) => e.stopPropagation()}
      className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[13px] flex flex-col gap-1"
    >
      {editing ? (
        <textarea
          autoFocus
          value={draft}
          onInput={(e) => setDraft(e.currentTarget.value)}
          onBlur={saveText}
          placeholder="Your argument…"
          className="w-full bg-transparent border-0 resize-none text-[13px] p-0 min-h-10 focus:outline-none"
        />
      ) : (
        <div>
          <div
            ref={textRef}
            onClick={() => isOwner && setEditing(true)}
            className={
              "whitespace-pre-wrap break-words " +
              (isOwner ? "cursor-text " : "") +
              (!expanded ? "line-clamp-5" : "")
            }
          >
            {arg.text || (
              <span className="text-slate-400 italic">
                {isOwner ? "Click to write…" : "(empty)"}
              </span>
            )}
          </div>
          {(overflowing || expanded) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              className="text-[11px] text-blue-600 hover:underline mt-0.5"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span className="opacity-70 truncate">
          {getParticipantName(arg.participant as string)}
        </span>
        <div className="flex items-center gap-1">
          {(isTeacher || isOwner) && (
            <button
              onClick={deleteArg}
              title="Delete argument"
              className="text-slate-400 hover:text-red-600 px-1"
            >
              ×
            </button>
          )}
          <button
            onClick={toggleVote}
            disabled={!currentParticipantId}
            title={myVote ? "Remove your vote" : "Thumb up"}
            className={
              "flex items-center gap-1 rounded px-1.5 py-0.5 border " +
              (myVote
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")
            }
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 7.59 6.59C7.22 6.95 7 7.45 7 8v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z" />
            </svg>
            <span className="tabular-nums">{votes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
