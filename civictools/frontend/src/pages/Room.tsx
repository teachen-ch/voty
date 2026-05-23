import { useEffect, useState } from "preact/hooks";
import { useLocation } from "wouter";
import { pb } from "../pb";
import {
  teacher,
  currentRoom,
  cacheParticipants,
  participantColor,
} from "../store";
import { useCursors } from "../hooks/useCursors";
import { useRoomData } from "../hooks/useRoomData";
import { useIsMobile } from "../hooks/useIsMobile";
import { InfiniteCanvas } from "../components/InfiniteCanvas";
import { MobileRoomView } from "../components/MobileRoomView";
import { FloatingToolbar } from "../components/FloatingToolbar";
import { DiscussionPromptModal } from "../components/DiscussionPromptModal";
import { VotingPromptModal } from "../components/VotingPromptModal";
import { TimerPromptModal } from "../components/TimerPromptModal";
import { UserBar } from "../components/UserBar";
import { RoomHeader } from "../components/RoomHeader";
import { ZoomControls } from "../components/ZoomControls";
import type { RecordModel } from "pocketbase";

interface Props {
  roomId: string;
}

export function Room({ roomId }: Props) {
  const [room, setRoom] = useState<RecordModel | null>(null);
  const [participantId, setParticipantId] = useState("");
  const [, navigate] = useLocation();

  const teacherRecord = teacher.value;
  const nickname =
    (teacherRecord?.name as string) ||
    (teacherRecord?.email as string) ||
    "Teacher";
  const myColor = participantColor(participantId || "teacher");

  const isMobile = useIsMobile();

  useCursors(roomId, participantId, nickname, myColor);
  useRoomData(roomId);

  useEffect(() => {
    pb.collection("rooms")
      .getOne(roomId)
      .then((r) => {
        setRoom(r);
        currentRoom.value = r;
      })
      .catch(() => navigate("/dashboard"));

    pb.collection("rooms").subscribe(roomId, (e) => {
      if (e.action === "update") {
        setRoom(e.record);
        currentRoom.value = e.record;
      }
    });

    const teacherId = teacherRecord?.id;
    if (teacherId) {
      pb.collection("participants")
        .getFirstListItem(`room = "${roomId}" && user = "${teacherId}"`)
        .then((p) => {
          setParticipantId(p.id);
          cacheParticipants([p]);
        });
    }

    return () => {
      pb.collection("rooms").unsubscribe(roomId);
    };
  }, [roomId]);

  if (!room) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {isMobile ? (
        <MobileRoomView
          roomId={roomId}
          participantId={participantId}
          isTeacher={true}
          stickyEnabled={true}
        />
      ) : (
        <>
          <InfiniteCanvas
            roomId={roomId}
            participantId={participantId}
            isTeacher={true}
            stickyEnabled={true}
          />
          <FloatingToolbar isTeacher={true} />
          <ZoomControls />
        </>
      )}
      <UserBar
        nickname={nickname}
        role="teacher"
        participantId={participantId}
      />
      <RoomHeader roomName={room.name as string} roomId={roomId} />
      <DiscussionPromptModal roomId={roomId} />
      <VotingPromptModal roomId={roomId} />
      <TimerPromptModal roomId={roomId} />
    </div>
  );
}
