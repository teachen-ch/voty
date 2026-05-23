import { JSX } from "preact/jsx-runtime";
import { activeTool, discussionModal, timerModal, votingModal } from "../store";
import type { Tool } from "../store";

function CursorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1.5L3 13L6 9.5L8.5 14.5L10 13.8L7.5 8.8L12 8.8Z" />
    </svg>
  );
}

function StickyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
    </svg>
  );
}

function DiscussionIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M2 3a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H5l-3 2V3z" />
      <path d="M7 9.5V11a1 1 0 001 1h4l2 1.5V8a1 1 0 00-1-1h-1.5" />
    </svg>
  );
}

function VotingIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M5 8.5l1.7 1.7L11 6" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="9" r="5" />
      <path d="M8 6.5V9l1.6 1.2" />
      <path d="M6 2h4" />
    </svg>
  );
}

interface Props {
  isTeacher: boolean;
}

const TOOL_BUTTONS: Array<{
  id: Tool;
  label: string;
  Icon: () => JSX.Element;
}> = [
  { id: "select", label: "Select", Icon: CursorIcon },
  { id: "sticky", label: "Sticky note", Icon: StickyIcon },
];

export function FloatingToolbar({ isTeacher }: Props) {
  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col p-1.5 gap-0.5 z-50"
      style={{ minWidth: 48 }}
    >
      {TOOL_BUTTONS.map(({ id, label, Icon }) => {
        const isActive = activeTool.value === id;
        return (
          <button
            key={id}
            title={label}
            onClick={() => (activeTool.value = id)}
            className={[
              "size-12 rounded-xl flex items-center justify-center transition-colors bg-white",
              isActive
                ? "bg-blue-100! text-blue-700"
                : "text-slate-600 hover:bg-slate-100",
            ].join(" ")}
          >
            <Icon />
          </button>
        );
      })}
      {isTeacher && (
        <>
          <button
            title="New discussion board"
            onClick={() => (discussionModal.value = {})}
            className="size-12 rounded-xl flex items-center justify-center bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <DiscussionIcon />
          </button>
          <button
            title="New voting"
            onClick={() => (votingModal.value = {})}
            className="size-12 rounded-xl flex items-center justify-center bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <VotingIcon />
          </button>
          <button
            title="New timer"
            onClick={() => (timerModal.value = {})}
            className="size-12 rounded-xl flex items-center justify-center bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <TimerIcon />
          </button>
        </>
      )}
    </div>
  );
}
