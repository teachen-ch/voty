import { useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import { useTranslation } from 'react-i18next'
import { pb } from '../pb'
import { studentSession, currentRoom, stickyNotes, applyNoteEvent, clearStudentSession, cacheParticipants } from '../store'
import { StickyBoard } from '../components/StickyBoard'

interface Props {
  roomId: string
}

export function StudentRoom({ roomId }: Props) {
  const { t } = useTranslation()
  const session = studentSession.value
  const room = currentRoom.value
  const [, navigate] = useLocation()

  useEffect(() => {
    if (!session) { navigate(`/join/${roomId}`); return }

    pb.collection('rooms')
      .getOne(roomId)
      .then(r => { currentRoom.value = r })
      .catch(() => navigate(`/join/${roomId}`))

    pb.collection('rooms').subscribe(roomId, e => {
      if (e.action === 'update') currentRoom.value = e.record
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

    return () => {
      pb.collection('rooms').unsubscribe(roomId)
      pb.collection('sticky_notes').unsubscribe('*')
    }
  }, [roomId])

  function leave() {
    clearStudentSession()
    navigate(`/join/${roomId}`)
  }

  if (!session) return null

  return (
    <div class="p-4">
      <div class="flex items-center gap-3 mb-4">
        <h1 class="mb-0 flex-1">{room?.name ?? '…'}</h1>
        <span class="text-slate-500 text-sm">
          {t('student.youAre')} <strong>{session.nickname}</strong>
        </span>
        <button class="secondary" onClick={leave}>{t('student.leave')}</button>
      </div>

      {!room ? (
        <p>{t('student.connecting')}</p>
      ) : room.sticky_notes_enabled ? (
        <StickyBoard roomId={roomId} participantId={session.participantId ?? ''} isTeacher={false} />
      ) : (
        <div class="card text-slate-500">
          {t('student.waitingSticky')}
        </div>
      )}
    </div>
  )
}
