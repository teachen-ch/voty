import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter'
import { useTranslation } from 'react-i18next'
import { pb } from '../pb'
import { teacher, currentRoom, stickyNotes, applyNoteEvent, cacheParticipants } from '../store'
import type { RecordModel } from 'pocketbase'
import { StickyBoard } from '../components/StickyBoard'
import { ShareLink } from '../components/ShareLink'

interface Props {
  roomId: string
}

export function Room({ roomId }: Props) {
  const { t } = useTranslation()
  const [room, setRoom] = useState<RecordModel | null>(null)
  const [participantId, setParticipantId] = useState<string | null>(null)
  const [, navigate] = useLocation()

  useEffect(() => {
    pb.collection('rooms')
      .getOne(roomId)
      .then(r => { setRoom(r); currentRoom.value = r })
      .catch(() => navigate('/dashboard'))

    pb.collection('rooms').subscribe(roomId, e => {
      if (e.action === 'update') {
        setRoom(e.record)
        currentRoom.value = e.record
      }
    })

    pb.collection('sticky_notes')
      .getList(1, 500, { filter: `room = "${roomId}"` })
      .then(res => { stickyNotes.value = res.items })

    pb.collection('sticky_notes').subscribe('*', e => {
      if (e.record.room !== roomId) return
      applyNoteEvent(e.action, e.record)
    })

    pb.collection('participants')
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then(res => cacheParticipants(res.items))

    const teacherId = teacher.value?.id
    if (teacherId) {
      const nickname = (teacher.value?.name as string) || (teacher.value?.email as string) || 'Teacher'
      pb.collection('participants')
        .getFirstListItem(`room = "${roomId}" && user = "${teacherId}"`)
        .catch(() => pb.collection('participants').create({
          room: roomId,
          nickname,
          role: 'teacher',
          user: teacherId,
        }))
        .then(p => {
          setParticipantId(p.id)
          cacheParticipants([p])
        })
    }

    return () => {
      pb.collection('rooms').unsubscribe(roomId)
      pb.collection('sticky_notes').unsubscribe('*')
    }
  }, [roomId])

  async function toggleSticky() {
    if (!room) return
    await pb.collection('rooms').update(roomId, {
      sticky_notes_enabled: !room.sticky_notes_enabled,
    })
  }

  if (!room) return <div class="page"><p>{t('room.loading')}</p></div>

  return (
    <div class="p-4">
      <div class="flex items-center gap-3 mb-4 flex-wrap">
        <button class="secondary" onClick={() => navigate('/dashboard')}>{t('room.back')}</button>
        <h1 class="mb-0 flex-1">{room.name}</h1>
        <ShareLink roomId={roomId} />
      </div>

      <div class="flex gap-2 mb-4">
        <label class="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={room.sticky_notes_enabled}
            onChange={toggleSticky}
            class="w-auto"
          />
          {t('room.stickyEnabled')}
        </label>
      </div>

      {room.sticky_notes_enabled ? (
        <StickyBoard roomId={roomId} participantId={participantId ?? ''} isTeacher={true} />
      ) : (
        <div class="card text-slate-500">
          {t('room.stickyDisabledHint')}
        </div>
      )}
    </div>
  )
}
