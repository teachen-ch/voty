import { participantCache, participantColor } from '../store'
import type { RecordModel } from 'pocketbase'

interface Props {
  nickname: string
  role: 'teacher' | 'student'
  participantId: string
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function UserBar({ nickname, role, participantId }: Props) {
  const color = participantColor(participantId)
  const allParticipants = Array.from(participantCache.value.values()) as RecordModel[]
  const others = allParticipants.filter(p => p.id !== participantId)
  const shown = others.slice(0, 4)
  const overflow = others.length - shown.length

  return (
    <div class="fixed left-4 top-4 flex items-center gap-2 z-50">
      <div class="flex items-center gap-2 bg-white rounded-2xl shadow border border-slate-200 px-3 py-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: color }}
        >
          {initials(nickname)}
        </div>
        <div class="leading-tight">
          <div class="text-sm font-semibold text-slate-800">{nickname}</div>
          <div class="text-[11px] text-slate-400">
            {role === 'teacher' ? 'Teacher · Du' : 'Student'}
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <div class="flex items-center bg-white rounded-2xl shadow border border-slate-200 px-2 py-2 gap-1">
          {shown.map(p => (
            <div
              key={p.id}
              title={p.nickname as string}
              class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: participantColor(p.id) }}
            >
              {initials(p.nickname as string)}
            </div>
          ))}
          {overflow > 0 && (
            <div class="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 text-slate-600 text-[10px] font-bold">
              +{overflow}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
