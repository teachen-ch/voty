import { useEffect, useState } from "preact/hooks";
import { useLocation } from "wouter";
import { pb } from "../pb";
import {
  teacher,
  currentRoom,
  stickyNotes,
  applyNoteEvent,
  cacheParticipants,
  participantColor,
} from "../store";
import { useCursors } from "../hooks/useCursors";
import { InfiniteCanvas } from "../components/InfiniteCanvas";
import { FloatingToolbar } from "../components/FloatingToolbar";
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

  useCursors(roomId, participantId, nickname, myColor);

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

    pb.collection("sticky_notes")
      .getList(1, 500, { filter: `room = "${roomId}"` })
      .then((res) => {
        stickyNotes.value = res.items;
      });

    pb.collection("sticky_notes").subscribe("*", (e) => {
      if (e.record.room !== roomId) return;
      applyNoteEvent(e.action, e.record);
    });

    pb.collection("participants")
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then((res) => cacheParticipants(res.items));

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
      pb.collection("sticky_notes").unsubscribe("*");
    };
  }, [roomId]);

  if (!room) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <InfiniteCanvas
        roomId={roomId}
        participantId={participantId}
        isTeacher={true}
        stickyEnabled={true}
      />
      <UserBar
        nickname={nickname}
        role="teacher"
        participantId={participantId}
      />
      <RoomHeader roomName={room.name as string} roomId={roomId} />
      <FloatingToolbar />
      <ZoomControls />
    </div>
  );
}
