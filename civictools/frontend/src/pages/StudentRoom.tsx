import { useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import { pb } from '../pb'
import {
  studentSession, currentRoom, stickyNotes, applyNoteEvent,
  clearStudentSession, cacheParticipants, participantColor,
} from '../store'
import { useCursors } from '../hooks/useCursors'
import { InfiniteCanvas } from '../components/InfiniteCanvas'
import { FloatingToolbar } from '../components/FloatingToolbar'
import { UserBar } from '../components/UserBar'
import { RoomHeader } from '../components/RoomHeader'
import { ZoomControls } from '../components/ZoomControls'

interface Props {
  roomId: string
}

export function StudentRoom({ roomId }: Props) {
  const session = studentSession.value
  const room = currentRoom.value
  const [, navigate] = useLocation()

  const participantId = session?.participantId ?? ''
  const nickname = session?.nickname ?? ''
  const myColor = participantColor(participantId || nickname)

  useCursors(roomId, participantId, nickname, myColor)

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

  if (!session) return null

  return (
    <div class="fixed inset-0 overflow-hidden">
      <InfiniteCanvas
        roomId={roomId}
        participantId={participantId}
        isTeacher={false}
        stickyEnabled={room?.sticky_notes_enabled as boolean ?? false}
      />
      <UserBar nickname={nickname} role="student" participantId={participantId} />
      {room && <RoomHeader roomName={room.name as string} roomId={roomId} />}
      <FloatingToolbar />
      <ZoomControls />
      <button
        class="fixed bottom-4 left-4 z-50 secondary text-sm"
        onClick={() => { clearStudentSession(); navigate(`/join/${roomId}`) }}
      >
        Leave
      </button>
    </div>
  )
}
