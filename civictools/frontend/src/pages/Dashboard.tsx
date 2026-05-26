import { useEffect, useRef, useState } from "preact/hooks";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";
import { ShareLink } from "../components/ShareLink";
import { Header } from "../components/Header";
import { timeSince, lastOpenedLabel } from "../util/time";

interface Presence {
  online: number;
  since: number;
}

export function Dashboard() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<RecordModel[]>([]);
  const [templates, setTemplates] = useState<RecordModel[]>([]);
  const [presence, setPresence] = useState<Record<string, Presence>>({});
  const [naming, setNaming] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const id = pb.authStore.model?.id;
    if (!id) return;
    pb.collection("rooms")
      .getList(1, 100, {
        filter: `teacher = "${id}" && is_template = false`,
        sort: "-last_active,-updated",
        requestKey: "dashboard-rooms",
      })
      .then((res) => setRooms(res.items))
      .catch((err) => console.error("Failed to load rooms:", err));

    pb.collection("rooms")
      .getList(1, 6, {
        filter: `is_template = true && slug != ""`,
        sort: "-created",
        requestKey: "dashboard-templates",
      })
      .then((res) => setTemplates(res.items))
      .catch(() => setTemplates([]));
  }, []);

  useEffect(() => {
    if (rooms.length === 0) return;
    const ids = rooms.map((r) => r.id).join(",");
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch(`/api/civictools/presence?rooms=${ids}`, {
          headers: { Authorization: pb.authStore.token },
        });
        if (!res.ok) return;
        const data = (await res.json()) as Record<string, Presence>;
        if (!cancelled) setPresence(data);
      } catch {
        /* ignore transient polling errors */
      }
    }
    poll();
    const iv = setInterval(poll, 10000);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [rooms]);

  function startNaming() {
    setNaming(true);
    setTimeout(() => nameInput.current?.focus(), 0);
  }

  async function createRoom(e: Event) {
    e.preventDefault();
    if (!roomName.trim() || creating) return;
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

      <h2 className="text-lg font-semibold mt-4 mb-3">
        {t("dashboard.startNew")}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        <div className="card shrink-0 w-64 border-dashed flex flex-col">
          {naming ? (
            <form onSubmit={createRoom} className="flex flex-col gap-2 h-full">
              <input
                ref={nameInput}
                value={roomName}
                onInput={(e) => setRoomName(e.currentTarget.value)}
                onBlur={() => !roomName.trim() && setNaming(false)}
                placeholder={t("dashboard.namePlaceholder")}
                className="w-full"
              />
              <button className="btn mt-auto" type="submit" disabled={creating}>
                {creating ? t("dashboard.creating") : t("dashboard.create")}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={startNaming}
              className="text-left flex flex-col h-full cursor-pointer"
            >
              <span className="self-start text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
                {t("dashboard.blankBadge")}
              </span>
              <span className="font-semibold mt-3">
                {t("dashboard.blankTitle")}
              </span>
              <span className="text-sm text-slate-500 mt-1">
                {t("dashboard.blankDesc")}
              </span>
            </button>
          )}
        </div>

        {templates.map((tpl) => (
          <Link
            key={tpl.id}
            href={`/copy/${tpl.slug}`}
            className="card shrink-0 w-64 flex flex-col no-underline text-inherit hover:border-slate-300"
          >
            <span className="self-start text-xs font-medium bg-violet-100 text-violet-700 rounded-full px-2.5 py-0.5">
              {t("dashboard.templateTag")}
            </span>
            <span className="font-semibold mt-3">{tpl.name}</span>
            {tpl.description && (
              <span className="text-sm text-slate-500 mt-1 line-clamp-2">
                {tpl.description}
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="mt-2 mb-8">
        <Link
          href="/templates"
          className="text-sm text-blue-600 hover:underline"
        >
          {t("dashboard.browseAll")}
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-3">
        {t("dashboard.continueRoom")}
      </h2>
      {rooms.length === 0 ? (
        <p className="text-slate-500">{t("dashboard.empty")}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {rooms.map((room) => {
            const p = presence[room.id];
            const live = p && p.online > 0;
            return (
              <div key={room.id} className="card flex items-center gap-3">
                <span
                  className={`w-14 shrink-0 inline-flex justify-center items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${
                    live
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {live && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  )}
                  {live ? t("dashboard.live") : t("dashboard.idle")}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/room/${room.id}`}
                    className="font-semibold text-slate-800 hover:underline block truncate"
                  >
                    {room.name}
                  </Link>
                  <span className="text-sm text-slate-500">
                    {live
                      ? `${t("dashboard.onlineCount", { count: p.online })} · ${t(
                          "dashboard.startedAgo",
                          { when: timeSince(p.since, t) }
                        )}`
                      : t("dashboard.lastOpened", {
                          when: lastOpenedLabel(
                            (room.last_active as string) ||
                              (room.updated as string),
                            t
                          ),
                        })}
                  </span>
                </div>
                <ShareLink roomId={room.id} />
                <button
                  className="btn"
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  {t("dashboard.open")}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
