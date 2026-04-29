import { useRef } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { pb } from '../pb'
import { stickyNotes } from '../store'
import { StickyNote } from './StickyNote'

const COLORS = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff', '#fed7aa']

interface Props {
  roomId: string
  participantId: string
  isTeacher: boolean
}

export function StickyBoard({ roomId, participantId, isTeacher }: Props) {
  const { t } = useTranslation()
  const boardRef = useRef<HTMLDivElement>(null)

  async function addNote(e: MouseEvent) {
    if ((e.target as Element) !== boardRef.current) return
    const board = boardRef.current!
    const rect = board.getBoundingClientRect()
    const pos_x = Math.min(90, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
    const pos_y = Math.min(85, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100))
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]

    await pb.collection('sticky_notes').create({
      room: roomId,
      content: '',
      pos_x,
      pos_y,
      color,
      participant: participantId,
    })
  }

  return (
    <div>
      <p class="text-[13px] text-slate-500 mt-0 mb-2">
        {t('board.hint')}
      </p>
      <div
        ref={boardRef}
        onClick={addNote}
        class="relative w-full h-[70vh] min-h-[400px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg overflow-hidden"
      >
        {stickyNotes.value.map(note => (
          <StickyNote
            key={note.id}
            note={note}
            isTeacher={isTeacher}
            currentParticipantId={participantId}
          />
        ))}
      </div>
    </div>
  )
}
