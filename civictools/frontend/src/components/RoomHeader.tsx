import { participantCache } from '../store'
import { ShareLink } from './ShareLink'

interface Props {
  roomName: string
  roomId: string
}

export function RoomHeader({ roomName, roomId }: Props) {
  const count = participantCache.value.size

  return (
    <div class="fixed right-4 top-4 flex items-center z-50">
      <div class="flex items-center gap-3 bg-white rounded-2xl shadow border border-slate-200 px-4 py-2">
        <span class="text-base font-bold text-indigo-600 tracking-tight">voty</span>
        <div class="w-px h-5 bg-slate-200" />
        <span class="text-sm font-semibold text-slate-800">{roomName}</span>
        <div class="w-px h-5 bg-slate-200" />
        <div class="flex items-center gap-1.5 text-[12px] text-slate-500">
          <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          live · {count} online
        </div>
        <ShareLink roomId={roomId} />
      </div>
    </div>
  )
}
