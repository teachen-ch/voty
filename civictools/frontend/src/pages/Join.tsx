import { useEffect, useState } from "preact/hooks";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { setStudentSession, studentSession } from "../store";
import type { RecordModel } from "pocketbase";

interface Props {
  roomId: string;
}

export function Join({ roomId }: Props) {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState(
    studentSession.value?.nickname ?? ""
  );
  const [room, setRoom] = useState<RecordModel | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [joining, setJoining] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    pb.collection("rooms")
      .getOne(roomId)
      .then((r) => setRoom(r))
      .catch(() => setNotFound(true));
  }, [roomId]);

  async function handleJoin(e: Event) {
    e.preventDefault();
    const name = nickname.trim();
    if (!name) return;
    setJoining(true);
    try {
      const existing = studentSession.value;
      if (existing?.roomId === roomId && existing.participantId) {
        if (existing.nickname !== name) {
          await pb
            .collection("participants")
            .update(existing.participantId, { nickname: name });
        }
        setStudentSession({ ...existing, nickname: name });
        navigate(`/s/${roomId}`);
        return;
      }
      const record = await pb.collection("participants").create({
        room: roomId,
        nickname: name,
        session_token: crypto.randomUUID(),
        role: "student",
      });
      setStudentSession({
        nickname: name,
        roomId,
        participantId: record.id,
        sessionToken: record["session_token"] as string,
      });
      navigate(`/s/${roomId}`);
    } finally {
      setJoining(false);
    }
  }

  if (notFound) {
    return (
      <div className="page max-w-100">
        <div className="card">
          <p className="error">{t("join.notFound")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page max-w-100">
      <h1>{t("appName")}</h1>
      <div className="card">
        <h2>
          {t("join.title")}
          {room ? `: ${room.name}` : "…"}
        </h2>
        <form onSubmit={handleJoin} className="flex flex-col gap-3">
          <input
            value={nickname}
            onInput={(e) => setNickname(e.currentTarget.value)}
            placeholder={t("join.nicknamePlaceholder")}
            maxLength={30}
            autoFocus
            required
          />
          <button type="submit" disabled={joining}>
            {t("join.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
