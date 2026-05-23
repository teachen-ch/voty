import { participantCache } from "../store";
import { VotyLogo } from "./images/voty-logo";
import { ShareLink } from "./ShareLink";

interface Props {
  roomName: string;
  roomId: string;
  isTeacher?: boolean;
}

export function RoomHeader({ roomName, roomId, isTeacher = true }: Props) {
  const count = participantCache.value.size;

  return (
    <div className="fixed top-3 inset-x-3 sm:left-auto sm:right-4 sm:top-4 sm:inset-x-auto flex items-center z-50">
      <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-2xl shadow border border-slate-200 px-3 sm:px-4 py-2 w-full sm:w-auto min-w-0">
        <VotyLogo className="w-10 sm:w-12 h-7 sm:h-8 shrink-0" />
        <div className="w-px h-5 bg-slate-200 shrink-0" />
        <span className="text-sm font-semibold text-slate-800 truncate min-w-0">
          {roomName}
        </span>
        <div className="w-px h-5 bg-slate-200 shrink-0" />
        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="hidden sm:inline">live · </span>
          {count}
          <span className="hidden sm:inline"> online</span>
        </div>
        {isTeacher && <ShareLink roomId={roomId} />}
      </div>
    </div>
  );
}
