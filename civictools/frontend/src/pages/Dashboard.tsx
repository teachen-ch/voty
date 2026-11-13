import { useEffect, useRef, useState } from "preact/hooks";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";
import { ShareLink, QrModal, joinUrl } from "../components/ShareLink";
import { ActionMenu, type MenuItem } from "../components/ActionMenu";
import { Header } from "../components/Header";
import { IntroModal } from "../components/IntroModal";
import { timeSince, lastOpenedLabel } from "../util/time";
import { tenant } from "../tenant";
import { isEditor, teacher } from "../store";
import { TemplateModal } from "../components/TemplateModal";
import { DeleteRoomModal } from "../components/DeleteRoomModal";
import {
  LinkIcon,
  LockIcon,
  OpenIcon,
  QrIcon,
  SettingsIcon,
  TemplateIcon,
  TrashIcon,
} from "../components/Icons";

interface Presence {
  online: number;
  since: number;
}

export function Dashboard() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<RecordModel[]>([]);
  const [templates, setTemplates] = useState<RecordModel[]>([]);
  const [managed, setManaged] = useState<RecordModel[]>([]);
  const [presence, setPresence] = useState<Record<string, Presence>>({});
  const [naming, setNaming] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [templateRoom, setTemplateRoom] = useState<RecordModel | null>(null);
  const [deleteRoom, setDeleteRoom] = useState<RecordModel | null>(null);
  const [qrRoom, setQrRoom] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const managesTemplates =
    isEditor.value && teacher.value?.tenant === tenant.id;

  function load() {
    const id = pb.authStore.model?.id;
    if (!id) return;
    pb.collection("rooms")
      .getList(1, 100, {
        filter: `teacher = "${id}"`,
        sort: "-last_active,-updated",
        requestKey: "dashboard-rooms",
      })
      .then((res) => setRooms(res.items))
      .catch((err) => console.error("Failed to load rooms:", err));

    pb.collection("rooms")
      .getList(1, 6, {
        filter: `is_template = true && slug != "" && tenant = "${tenant.id}"`,
        sort: "-created",
        requestKey: "dashboard-templates",
      })
      .then((res) => setTemplates(res.items))
      .catch(() => setTemplates([]));

    if (managesTemplates) {
      pb.collection("rooms")
        .getList(1, 200, {
          filter: `is_template = true && tenant = "${tenant.id}"`,
          sort: "name",
          requestKey: "dashboard-managed",
        })
        .then((res) => setManaged(res.items))
        .catch(() => setManaged([]));
    }
  }

  useEffect(load, [managesTemplates]);

  function rowStart(room: RecordModel) {
    if (room.template_locked) {
      return (
        <span
          className="p-1.5 text-amber-600"
          title={t("template.lockedTitle")}
          aria-label={t("template.lockedTitle")}
        >
          <LockIcon />
        </span>
      );
    }
    return (
      <button
        className="btn! bg-transparent! text-slate-500! hover:text-red-600! hover:bg-red-50! p-1.5! rounded opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100 transition-opacity"
        title={t("deleteRoom.button")}
        aria-label={t("deleteRoom.button")}
        onClick={() => setDeleteRoom(room)}
      >
        <TrashIcon />
      </button>
    );
  }

  function deleteItem(room: RecordModel): MenuItem {
    return room.template_locked
      ? {
          label: t("template.locked"),
          icon: <LockIcon size={16} />,
          disabled: true,
        }
      : {
          label: t("deleteRoom.button"),
          icon: <TrashIcon size={16} />,
          danger: true,
          onClick: () => setDeleteRoom(room),
        };
  }

  async function copyLink(roomId: string) {
    await navigator.clipboard.writeText(joinUrl(roomId));
    setToast(t("shareLink.copied"));
    setTimeout(() => setToast(null), 2000);
  }

  function roomMenu(room: RecordModel): MenuItem[] {
    const items: MenuItem[] = [
      {
        label: t("dashboard.open"),
        icon: <OpenIcon size={16} />,
        onClick: () => navigate(`/room/${room.id}`),
      },
      {
        label: t("shareLink.showQr"),
        icon: <QrIcon size={16} />,
        onClick: () => setQrRoom(room.id),
      },
      {
        label: t("shareLink.copy"),
        icon: <LinkIcon size={16} />,
        onClick: () => copyLink(room.id),
      },
    ];
    if (isEditor.value) {
      items.push({
        label: room.is_template ? t("template.title") : t("template.promote"),
        icon: <TemplateIcon size={16} />,
        onClick: () => setTemplateRoom(room),
      });
    }
    items.push(deleteItem(room));
    return items;
  }

  function templateMenu(room: RecordModel): MenuItem[] {
    return [
      {
        label: room.template_locked ? t("dashboard.view") : t("dashboard.edit"),
        icon: <OpenIcon size={16} />,
        onClick: () => navigate(`/room/${room.id}`),
      },
      {
        label: t("template.settings"),
        icon: <SettingsIcon size={16} />,
        onClick: () => setTemplateRoom(room),
      },
      deleteItem(room),
    ];
  }

  const myRooms = managesTemplates
    ? rooms.filter((r) => !(r.is_template && r.tenant === tenant.id))
    : rooms;

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

  function onTemplateSaved() {
    load();
  }

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
        tenant: tenant.id,
        sticky_notes_enabled: false,
        ballots_enabled: false,
        interactions_locked: false,
      });
      navigate(`/room/${record.id}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <IntroModal screen="dashboard" />
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
              <span className="self-start text-xs font-medium bg-primary-100 text-primary-700 rounded-full px-2.5 py-0.5">
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
          className="text-sm text-primary-600 hover:underline"
        >
          {t("dashboard.browseAll")}
        </Link>
      </div>

      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{t("dashboard.continueRoom")}</h2>
        {tenant.docLink && (
          <a
            href={tenant.docLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:underline"
          >
            {t("dashboard.howItWorks")}
          </a>
        )}
      </div>
      {myRooms.length === 0 ? (
        <p className="text-slate-500">
          {t("dashboard.empty")}
          {tenant.docLink && (
            <>
              {" "}
              <a
                href={tenant.docLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                {t("dashboard.howItWorks")}
              </a>
            </>
          )}
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {myRooms.map((room) => {
            const p = presence[room.id];
            const live = p && p.online > 0;
            return (
              <div
                key={room.id}
                className="card group flex items-center gap-3 max-sm:p-4!"
              >
                <span
                  className={`text-nowrap shrink-0 justify-center items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${
                    live
                      ? "inline-flex bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "hidden sm:inline-flex bg-slate-100 text-slate-500"
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
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center">
                    {rowStart(room)}
                    <ShareLink
                      roomId={room.id}
                      dashboard
                      qrOnly={isEditor.value}
                    />
                  </div>
                  {isEditor.value && (
                    <button
                      className={
                        room.is_template
                          ? "btn bg-violet-600! hover:bg-violet-700!"
                          : "btn secondary"
                      }
                      title={t("template.promoteTitle")}
                      onClick={() => setTemplateRoom(room)}
                    >
                      {room.is_template
                        ? t("template.button")
                        : t("template.promote")}
                    </button>
                  )}
                  <button
                    className="btn"
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    {t("dashboard.open")}
                  </button>
                </div>
                <div className="sm:hidden">
                  <ActionMenu items={roomMenu(room)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {managesTemplates && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-1!">
            {t("dashboard.manageTemplates", { tenant: tenant.name })}
          </h2>
          <p className="text-sm text-slate-500 mt-0 mb-3">
            {t("dashboard.manageTemplatesHint", { tenant: tenant.name })}
          </p>
          {managed.length === 0 ? (
            <p className="text-slate-500">{t("dashboard.noManaged")}</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {managed.map((room) => {
                const mine = room.teacher === pb.authStore.model?.id;
                return (
                  <div
                    key={room.id}
                    className="card group flex items-center gap-3 max-sm:p-4!"
                  >
                    <span className="shrink-0 hidden sm:inline-flex items-center gap-1 text-xs font-medium bg-violet-100 text-violet-700 rounded-full px-2.5 py-1">
                      {room.template_locked && <LockIcon size={12} />}
                      {t("dashboard.templateTag")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/room/${room.id}`}
                        className="font-semibold text-slate-800 hover:underline flex items-center gap-1.5 min-w-0"
                      >
                        {room.template_locked && (
                          <LockIcon
                            size={14}
                            className="sm:hidden shrink-0 text-amber-600"
                          />
                        )}
                        <span className="truncate">{room.name}</span>
                      </Link>
                      <span className="text-sm text-slate-500">
                        {mine
                          ? t("template.byYou")
                          : t("template.by", {
                              owner: (room.owner_name as string) || "?",
                            })}
                        {" · "}
                        {t("dashboard.edited", {
                          when: lastOpenedLabel(room.updated as string, t),
                        })}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      {rowStart(room)}
                      <button
                        className="btn secondary"
                        onClick={() => setTemplateRoom(room)}
                      >
                        {t("template.settings")}
                      </button>
                      <button
                        className="btn"
                        onClick={() => navigate(`/room/${room.id}`)}
                      >
                        {room.template_locked
                          ? t("dashboard.view")
                          : t("dashboard.edit")}
                      </button>
                    </div>
                    <div className="sm:hidden">
                      <ActionMenu items={templateMenu(room)} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
      {templateRoom && (
        <TemplateModal
          room={templateRoom}
          onClose={() => setTemplateRoom(null)}
          onSaved={onTemplateSaved}
          onCopied={load}
        />
      )}
      {qrRoom && (
        <QrModal url={joinUrl(qrRoom)} onClose={() => setQrRoom(null)} />
      )}
      {toast && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-[110] bg-slate-800 text-white text-sm rounded-full px-4 py-2 shadow-lg"
        >
          {toast}
        </div>
      )}
      {deleteRoom && (
        <DeleteRoomModal
          room={deleteRoom}
          onClose={() => setDeleteRoom(null)}
          onDeleted={load}
        />
      )}
    </div>
  );
}
