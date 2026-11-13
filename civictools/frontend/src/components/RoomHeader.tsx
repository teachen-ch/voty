import { presence } from "../store";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { ShareLink } from "./ShareLink";
import { LockIcon } from "./Icons";

interface Props {
  roomName: string;
  roomId: string;
  isTeacher?: boolean;
  locked?: boolean;
}

export function RoomHeader({
  roomName,
  roomId,
  isTeacher = true,
  locked = false,
}: Props) {
  const { t } = useTranslation();
  const count = presence.value.length;

  return (
    <div className="fixed top-3 inset-x-3 sm:left-auto sm:right-4 sm:top-4 sm:inset-x-auto flex items-center z-50">
      <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-2xl shadow border border-slate-200 px-3 sm:px-4 py-2 w-full sm:w-auto min-w-0">
        <Logo className="h-7 sm:h-8 w-auto shrink-0" />
        <div className="w-px h-5 bg-slate-200 shrink-0" />
        <span className="text-sm font-semibold text-slate-800 truncate min-w-0">
          {roomName}
        </span>
        {locked && isTeacher && (
          <span
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 shrink-0"
            title={t("template.lockedTitle")}
          >
            <LockIcon size={12} />
            <span className="hidden sm:inline">{t("template.locked")}</span>
          </span>
        )}
        <div className="w-px h-5 bg-slate-200 shrink-0" />
        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="hidden sm:inline">{t("room.live")} · </span>
          {count}
          <span className="hidden sm:inline"> {t("room.online")}</span>
        </div>
        {isTeacher && <ShareLink roomId={roomId} />}
      </div>
    </div>
  );
}
