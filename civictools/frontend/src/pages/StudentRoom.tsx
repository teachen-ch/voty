import { useEffect } from "preact/hooks";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { studentSession, currentRoom, participantColor } from "../store";
import { useCursors } from "../hooks/useCursors";
import { useRoomData } from "../hooks/useRoomData";
import { useIsMobile } from "../hooks/useIsMobile";
import { InfiniteCanvas } from "../components/InfiniteCanvas";
import { MobileRoomView } from "../components/MobileRoomView";
import { FloatingToolbar } from "../components/FloatingToolbar";
import { UserBar } from "../components/UserBar";
import { RoomHeader } from "../components/RoomHeader";
import { ZoomControls } from "../components/ZoomControls";

interface Props {
  roomId: string;
}

export function StudentRoom({ roomId }: Props) {
  const { t } = useTranslation();
  const session = studentSession.value;
  const room = currentRoom.value;
  const [, navigate] = useLocation();

  const participantId = session?.participantId ?? "";
  const nickname = session?.nickname ?? "";
  const myColor = participantColor(participantId || nickname);

  const isMobile = useIsMobile();
  const stickyEnabled = (room?.sticky_notes_enabled as boolean) ?? false;
  const interactionsLocked = (room?.interactions_locked as boolean) ?? false;

  useCursors(roomId, participantId, nickname, myColor);
  useRoomData(roomId);

  useEffect(() => {
    if (!session) {
      navigate(`/join/${roomId}`);
      return;
    }

    pb.collection("rooms")
      .getOne(roomId)
      .then((r) => {
        currentRoom.value = r;
      })
      .catch(() => navigate(`/join/${roomId}`));

    pb.collection("rooms").subscribe(roomId, (e) => {
      if (e.action === "update") currentRoom.value = e.record;
    });

    return () => {
      pb.collection("rooms").unsubscribe(roomId);
    };
  }, [roomId]);

  if (!session) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {isMobile ? (
        <MobileRoomView
          roomId={roomId}
          participantId={participantId}
          isTeacher={false}
          stickyEnabled={stickyEnabled}
          interactionsLocked={(room?.interactions_locked as boolean) ?? false}
        />
      ) : (
        <>
          <InfiniteCanvas
            roomId={roomId}
            participantId={participantId}
            isTeacher={false}
            stickyEnabled={stickyEnabled}
            interactionsLocked={(room?.interactions_locked as boolean) ?? false}
          />
          <FloatingToolbar isTeacher={false} />
          <ZoomControls />
        </>
      )}
      <UserBar
        nickname={nickname}
        role="student"
        participantId={participantId}
      />
      {room && (
        <RoomHeader
          roomName={room.name as string}
          roomId={roomId}
          isTeacher={false}
        />
      )}
      <button
        className="btn secondary fixed bottom-4 left-4 z-50 text-sm"
        onClick={() => navigate(`/join/${roomId}`)}
      >
        {t("student.leave")}
      </button>
      {interactionsLocked && (
        <div
          aria-label="Interactions locked"
          title="Interactions locked"
          className="fixed bottom-16 left-4 z-50 pointer-events-none text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3h-2V7a2 2 0 0 0-4 0v3z" />
          </svg>
        </div>
      )}
    </div>
  );
}
