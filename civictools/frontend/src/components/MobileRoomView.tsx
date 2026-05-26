import { useMemo, useState } from "preact/hooks";
import { pb } from "../pb";
import {
  discussionBoards,
  votings,
  timers,
  stickyNotes,
  getParticipantName,
  discussionModal,
  votingModal,
  timerModal,
} from "../store";
import { DiscussionBoard } from "./DiscussionBoard";
import { VotingBoard } from "./VotingBoard";
import { TimerBoard } from "./TimerBoard";
import type { RecordModel } from "pocketbase";

interface Props {
  roomId: string;
  participantId: string;
  isTeacher: boolean;
  stickyEnabled: boolean;
}

type Item =
  | { kind: "discussion"; rec: RecordModel }
  | { kind: "voting"; rec: RecordModel }
  | { kind: "timer"; rec: RecordModel };

export function MobileRoomView({
  roomId,
  participantId,
  isTeacher,
  stickyEnabled,
}: Props) {
  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...discussionBoards.value.map(
        (rec) => ({ kind: "discussion", rec }) as Item
      ),
      ...votings.value.map((rec) => ({ kind: "voting", rec }) as Item),
      ...timers.value.map((rec) => ({ kind: "timer", rec }) as Item),
    ];
    return all.sort(
      (a, b) => (a.rec.pos_y as number) - (b.rec.pos_y as number)
    );
  }, [discussionBoards.value, votings.value, timers.value]);

  const notes = stickyNotes.value;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-slate-50">
      <div className="flex flex-col gap-3 p-3 pt-28 pb-24 max-w-2xl mx-auto">
        {items.length === 0 && notes.length === 0 && (
          <div className="text-center text-slate-400 italic py-12 text-sm">
            Nothing here yet.
          </div>
        )}

        {items.map((it) => {
          if (it.kind === "discussion") {
            return (
              <DiscussionBoard
                key={`d-${it.rec.id}`}
                board={it.rec}
                isTeacher={isTeacher}
                currentParticipantId={participantId}
                mobile
              />
            );
          }
          if (it.kind === "voting") {
            return (
              <VotingBoard
                key={`v-${it.rec.id}`}
                voting={it.rec}
                isTeacher={isTeacher}
                currentParticipantId={participantId}
                mobile
              />
            );
          }
          return (
            <TimerBoard
              key={`t-${it.rec.id}`}
              timer={it.rec}
              isTeacher={isTeacher}
              mobile
            />
          );
        })}

        {notes.length > 0 && (
          <MobileNotesSection
            roomId={roomId}
            participantId={participantId}
            isTeacher={isTeacher}
            stickyEnabled={stickyEnabled}
            notes={notes}
          />
        )}
      </div>

      {isTeacher && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => (discussionModal.value = {})}
            className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
          >
            + Discussion
          </button>
          <button
            onClick={() => (votingModal.value = {})}
            className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
          >
            + Voting
          </button>
          <button
            onClick={() => (timerModal.value = {})}
            className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
          >
            + Timer
          </button>
        </div>
      )}
    </div>
  );
}

const NOTE_COLORS = [
  "#fef08a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecaca",
  "#e9d5ff",
  "#fed7aa",
];

function MobileNotesSection({
  roomId,
  participantId,
  isTeacher,
  stickyEnabled,
  notes,
}: {
  roomId: string;
  participantId: string;
  isTeacher: boolean;
  stickyEnabled: boolean;
  notes: RecordModel[];
}) {
  const [collapsed, setCollapsed] = useState(false);
  const canAdd = isTeacher || stickyEnabled;

  async function addNote() {
    if (!canAdd) return;
    await pb.collection("sticky_notes").create({
      room: roomId,
      content: "",
      pos_x: 3000,
      pos_y: 2000,
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      participant: participantId,
    });
  }

  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 flex flex-col">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-200 rounded-t-xl bg-slate-50">
        <span className="text-sm font-semibold text-slate-700">
          Notes ({notes.length})
        </span>
        <div className="flex items-center gap-1">
          {canAdd && (
            <button
              onClick={addNote}
              title="Add note"
              className="text-slate-500 hover:text-slate-900 px-1 text-base leading-none"
            >
              +
            </button>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
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
        </div>
      </div>
      {!collapsed && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {notes.map((n) => (
            <MobileNote
              key={n.id}
              note={n}
              isTeacher={isTeacher}
              currentParticipantId={participantId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNote({
  note,
  isTeacher,
  currentParticipantId,
}: {
  note: RecordModel;
  isTeacher: boolean;
  currentParticipantId: string;
}) {
  const isOwner = note.participant === currentParticipantId;
  async function updateContent(content: string) {
    await pb.collection("sticky_notes").update(note.id, { content });
  }
  async function deleteNote() {
    await pb.collection("sticky_notes").delete(note.id);
  }
  return (
    <div
      className="rounded p-2 flex flex-col gap-1 shadow-sm min-h-[100px]"
      style={{ background: note.color as string }}
    >
      <textarea
        value={note.content as string}
        onInput={(e) => updateContent(e.currentTarget.value)}
        placeholder="Type here…"
        className="flex-1 bg-transparent border-0 resize-none text-[13px] p-0 min-h-16 focus:outline-none"
        style={{ font: "inherit" }}
        readOnly={!isOwner && !isTeacher}
      />
      <div className="flex justify-between items-center">
        <small className="opacity-60 text-[11px]">
          {getParticipantName(note.participant as string)}
        </small>
        {(isTeacher || isOwner) && (
          <button
            onClick={deleteNote}
            style={{
              padding: "1px 5px",
              fontSize: 11,
              background: "rgba(0,0,0,0.1)",
              color: "inherit",
              border: "none",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
