import { participantCache } from "../store";
import { VotyLogo } from "./images/voty-logo";
import { ShareLink } from "./ShareLink";

interface Props {
  roomName: string;
  roomId: string;
}

export function RoomHeader({ roomName, roomId }: Props) {
  const count = participantCache.value.size;

  return (
    <div className="fixed right-4 top-4 flex items-center z-50">
      <div className="flex items-center gap-3 bg-white rounded-2xl shadow border border-slate-200 px-4 py-2">
        <VotyLogo className="w-12 h-8" />
        <div className="w-px h-5 bg-slate-200" />
        <span className="text-sm font-semibold text-slate-800">{roomName}</span>
        <div className="w-px h-5 bg-slate-200" />
        <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          live · {count} online
        </div>
        <ShareLink roomId={roomId} />
      </div>
    </div>
  );
}
