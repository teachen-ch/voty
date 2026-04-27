import { useEffect, useRef, useState } from 'preact/hooks'
import type { RefObject } from 'preact'
import { pb } from '../pb'
import { participantCache, getParticipantName } from '../store'
import type { RecordModel } from 'pocketbase'

interface Props {
  note: RecordModel
  boardRef: RefObject<HTMLDivElement>
  isTeacher: boolean
  currentParticipantId: string
}

interface DragState {
  startX: number
  startY: number
  origX: number
  origY: number
}

export function StickyNote({ note, boardRef, isTeacher, currentParticipantId }: Props) {
  const noteRef = useRef<HTMLDivElement>(null)
  const drag = useRef<DragState | null>(null)
  const [pos, setPos] = useState({ x: note.pos_x as number, y: note.pos_y as number })
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!drag.current) {
      setPos({ x: note.pos_x as number, y: note.pos_y as number })
    }
  }, [note.pos_x, note.pos_y])

  const pid = note.participant as string | undefined
  useEffect(() => {
    if (pid && !participantCache.value.has(pid)) return
    forceUpdate(n => n + 1)
  }, [participantCache.value, pid])

  function onPointerDown(e: PointerEvent) {
    e.stopPropagation()
    e.preventDefault()
    noteRef.current!.setPointerCapture(e.pointerId)
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: note.pos_x as number,
      origY: note.pos_y as number,
    }
  }

  function onPointerMove(e: PointerEvent) {
    if (!drag.current || !boardRef.current) return
    const rect = boardRef.current.getBoundingClientRect()
    const dx = ((e.clientX - drag.current.startX) / rect.width) * 100
    const dy = ((e.clientY - drag.current.startY) / rect.height) * 100
    setPos({
      x: Math.min(90, Math.max(0, drag.current.origX + dx)),
      y: Math.min(85, Math.max(0, drag.current.origY + dy)),
    })
  }

  async function onPointerUp() {
    if (!drag.current) return
    drag.current = null
    await pb.collection('sticky_notes').update(note.id, { pos_x: pos.x, pos_y: pos.y })
  }

  async function updateContent(content: string) {
    await pb.collection('sticky_notes').update(note.id, { content })
  }

  async function deleteNote(e: MouseEvent) {
    e.stopPropagation()
    await pb.collection('sticky_notes').delete(note.id)
  }

  const isOwner = note.participant === currentParticipantId

  return (
    <div
      ref={noteRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      class="absolute w-[160px] min-h-[120px] p-2 rounded cursor-grab select-none touch-none flex flex-col gap-1 shadow-[2px_3px_8px_rgba(0,0,0,0.15)]"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        background: note.color as string,
      }}
    >
      <textarea
        value={note.content as string}
        onInput={e => updateContent(e.currentTarget.value)}
        onPointerDown={e => e.stopPropagation()}
        placeholder="Type here…"
        class="flex-1 bg-transparent border-0 resize-none text-[13px] p-0 min-h-[70px] cursor-text focus:outline-none"
        style={{ font: 'inherit' }}
      />
      <div class="flex justify-between items-center">
        <small class="opacity-60 text-[11px]">{getParticipantName(note.participant as string)}</small>
        {(isTeacher || isOwner) && (
          <button
            onClick={deleteNote}
            onPointerDown={e => e.stopPropagation()}
            style={{
              padding: '1px 5px',
              fontSize: 11,
              background: 'rgba(0,0,0,0.1)',
              color: 'inherit',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
