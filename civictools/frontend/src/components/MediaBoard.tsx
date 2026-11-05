import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { canvasTransform } from "../store";
import type { RecordModel } from "pocketbase";

interface Props {
  item: RecordModel;
  isTeacher: boolean;
  mobile?: boolean;
}

const MIN_WIDTH = 80;
const MAX_WIDTH = 4000;

const EMBED_HOSTS = [
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "www.dailymotion.com",
];

function safeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && EMBED_HOSTS.includes(u.hostname)
      ? u.toString()
      : null;
  } catch {
    return null;
  }
}

type Gesture =
  | { type: "move"; sx: number; sy: number; ox: number; oy: number }
  | { type: "resize"; sx: number; ow: number };

export function MediaBoard({ item, isTeacher, mobile = false }: Props) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState({
    x: item.pos_x as number,
    y: item.pos_y as number,
  });
  const [width, setWidth] = useState(item.width as number);

  useEffect(() => {
    if (gesture.current) return;
    setPos({ x: item.pos_x as number, y: item.pos_y as number });
    setWidth(item.width as number);
  }, [item.pos_x, item.pos_y, item.width]);

  const isVideo = item.kind === "video";
  const aspect = (item.aspect_ratio as number) || 16 / 9;
  const description = (item.description as string) || "";
  const embed = isVideo ? safeEmbed(item.embed_url as string) : null;
  const canEdit = isTeacher && !mobile;

  function begin(e: PointerEvent, g: Gesture) {
    e.stopPropagation();
    e.preventDefault();
    ref.current!.setPointerCapture(e.pointerId);
    gesture.current = g;
    setBusy(true);
  }

  function onMovePointerDown(e: PointerEvent) {
    if (!canEdit) return;
    begin(e, {
      type: "move",
      sx: e.clientX,
      sy: e.clientY,
      ox: pos.x,
      oy: pos.y,
    });
  }

  function onResizePointerDown(e: PointerEvent) {
    begin(e, { type: "resize", sx: e.clientX, ow: width });
  }

  function onPointerMove(e: PointerEvent) {
    const g = gesture.current;
    if (!g) return;
    const { scale } = canvasTransform.value;
    if (g.type === "move") {
      setPos({
        x: g.ox + (e.clientX - g.sx) / scale,
        y: g.oy + (e.clientY - g.sy) / scale,
      });
    } else {
      setWidth(
        Math.min(
          MAX_WIDTH,
          Math.max(MIN_WIDTH, g.ow + (e.clientX - g.sx) / scale)
        )
      );
    }
  }

  async function onPointerUp() {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    setBusy(false);
    await pb
      .collection("media_items")
      .update(
        item.id,
        g.type === "move"
          ? { pos_x: pos.x, pos_y: pos.y }
          : { width: Math.round(width) }
      );
  }

  async function remove(e: MouseEvent) {
    e.stopPropagation();
    if (!confirm(t("media.confirmDelete"))) return;
    await pb.collection("media_items").delete(item.id);
  }

  const label = description || t(isVideo ? "media.video" : "media.image");

  const content = isVideo ? (
    embed ? (
      <iframe
        src={embed}
        title={label}
        aria-label={label}
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        allow="fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="w-full h-full block border-0"
      />
    ) : null
  ) : (
    <img
      src={pb.files.getURL(item, item.file as string)}
      alt={description}
      draggable={false}
      onPointerDown={onMovePointerDown}
      className={
        "w-full h-full block object-contain" +
        (canEdit ? " cursor-move touch-none select-none" : "")
      }
    />
  );

  if (mobile) {
    return (
      <div
        className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200"
        style={{ aspectRatio: String(aspect) }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-note="1"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="group absolute select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${width}px`,
        height: `${width / aspect}px`,
      }}
    >
      {canEdit && (
        <div className="absolute -top-8 left-0 right-0 h-8 flex items-center justify-between opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <div
            onPointerDown={onMovePointerDown}
            title={t("media.drag")}
            aria-label={t("media.drag")}
            className="flex-1 h-6 rounded bg-slate-800/80 cursor-move touch-none"
          />
          <button
            type="button"
            onClick={remove}
            title={t("media.delete")}
            aria-label={t("media.delete")}
            className="ml-1 size-6 rounded bg-slate-800/80 text-white hover:bg-red-600 flex items-center justify-center text-sm leading-none"
          >
            ×
          </button>
        </div>
      )}
      <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-[3px_4px_14px_rgba(0,0,0,0.18)] border border-slate-200">
        {content}
        {busy && <div className="absolute inset-0" />}
      </div>
      {canEdit && (
        <div
          onPointerDown={onResizePointerDown}
          title={t("media.resize")}
          aria-label={t("media.resize")}
          className="absolute -right-2 -bottom-2 size-4 rounded-full bg-primary-600 border-2 border-white cursor-nwse-resize touch-none opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </div>
  );
}
