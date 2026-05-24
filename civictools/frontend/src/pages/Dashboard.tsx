import { useEffect, useState } from "preact/hooks";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";
import { ShareLink } from "../components/ShareLink";
import { Header } from "../components/Header";

export function Dashboard() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<RecordModel[]>([]);
  const [roomName, setRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const id = pb.authStore.model?.id;
    if (!id) return;
    pb.collection("rooms")
      .getList(1, 50, {
        filter: `teacher = "${id}" && is_template != true`,
        sort: "-created",
      })
      .then((res) => setRooms(res.items))
      .catch((err) => console.error("Failed to load rooms:", err));
  }, []);

  async function createRoom(e: Event) {
    e.preventDefault();
    if (!roomName.trim()) return;
    setCreating(true);
    try {
      const record = await pb.collection("rooms").create({
        name: roomName.trim(),
        teacher: pb.authStore.model?.id,
        sticky_notes_enabled: false,
        ballots_enabled: false,
      });
      navigate(`/room/${record.id}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <h1>{t("dashboard.title")}</h1>

      <form onSubmit={createRoom} className="flex gap-2 mb-2">
        <input
          value={roomName}
          onInput={(e) => setRoomName(e.currentTarget.value)}
          placeholder={t("dashboard.namePlaceholder")}
          className="flex-1"
        />
        <button className="btn" type="submit" disabled={creating}>
          {creating ? t("dashboard.creating") : t("dashboard.create")}
        </button>
      </form>
      <div className="mb-6">
        <Link
          href="/templates"
          className="text-sm text-blue-600 hover:underline"
        >
          {t("dashboard.chooseTemplate")}
        </Link>
      </div>

      {rooms.length === 0 && (
        <p className="text-slate-500">{t("dashboard.empty")}</p>
      )}

      <div className="flex flex-col gap-2.5">
        {rooms.map((room) => (
          <div key={room.id} className="card flex items-center gap-3">
            <span className="flex-1 font-medium">{room.name}</span>
            <ShareLink roomId={room.id} />
            <button
              className="btn"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              {t("dashboard.open")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
