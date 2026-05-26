import { JSX } from "preact/jsx-runtime";
import {
  activeTool,
  discussionModal,
  timerModal,
  votingModal,
  rankingModal,
} from "../store";
import type { Tool } from "../store";
import { useTranslation } from "react-i18next";

function CursorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1.5L3 13L6 9.5L8.5 14.5L10 13.8L7.5 8.8L12 8.8Z" />
    </svg>
  );
}

function StickyIcon() {
  return (
    <svg
      width="20"
      height="20"
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
      width="20"
      height="20"
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
      width="20"
      height="20"
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

function RankingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h10M3 8h7M3 12h4" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function Tooltip({ label }: { label: string }) {
  return (
    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
      <div className="relative bg-slate-900 text-white text-sm font-medium rounded-lg px-3 py-1.5 whitespace-nowrap">
        {label}
        {/* arrow pointing right toward the toolbar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-full"
          style={{
            width: 0,
            height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: "6px solid rgb(15 23 42)",
          }}
        />
      </div>
    </div>
  );
}

interface Props {
  isTeacher: boolean;
}

const TOOL_BUTTONS: Array<{
  id: Tool;
  labelKey: string;
  Icon: () => JSX.Element;
}> = [
  { id: "select", labelKey: "toolbar.select", Icon: CursorIcon },
  { id: "sticky", labelKey: "toolbar.sticky", Icon: StickyIcon },
];

export function FloatingToolbar({ isTeacher }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col p-1 gap-0.5 z-50"
      style={{ minWidth: 44 }}
    >
      {TOOL_BUTTONS.map(({ id, labelKey, Icon }) => {
        const isActive = activeTool.value === id;
        return (
          <div key={id} className="relative group">
            <button
              title={t(labelKey)}
              onClick={() => (activeTool.value = id)}
              className={[
                "size-10 rounded-xl flex items-center justify-center transition-colors",
                isActive
                  ? "bg-blue-100! text-blue-700"
                  : "bg-white text-black hover:bg-slate-100",
              ].join(" ")}
            >
              <Icon />
            </button>
            <Tooltip label={t(labelKey)} />
          </div>
        );
      })}
      {isTeacher && (
        <>
          <div className="relative group">
            <button
              title={t("toolbar.discussion")}
              onClick={() => (discussionModal.value = {})}
              className="size-10 rounded-xl flex items-center justify-center bg-white text-black hover:bg-slate-100 transition-colors"
            >
              <DiscussionIcon />
            </button>
            <Tooltip label={t("toolbar.discussion")} />
          </div>
          <div className="relative group">
            <button
              title={t("toolbar.voting")}
              onClick={() => (votingModal.value = {})}
              className="size-10 rounded-xl flex items-center justify-center bg-white text-black hover:bg-slate-100 transition-colors"
            >
              <VotingIcon />
            </button>
            <Tooltip label={t("toolbar.voting")} />
          </div>
          <div className="relative group">
            <button
              title={t("toolbar.timer")}
              onClick={() => (timerModal.value = {})}
              className="size-10 rounded-xl flex items-center justify-center bg-white text-black hover:bg-slate-100 transition-colors"
            >
              <TimerIcon />
            </button>
            <Tooltip label={t("toolbar.timer")} />
          </div>
          <div className="relative group">
            <button
              title={t("toolbar.ranking")}
              onClick={() => (rankingModal.value = {})}
              className="size-10 rounded-xl flex items-center justify-center bg-white text-black hover:bg-slate-100 transition-colors"
            >
              <RankingIcon />
            </button>
            <Tooltip label={t("toolbar.ranking")} />
          </div>
        </>
      )}
    </div>
  );
}
