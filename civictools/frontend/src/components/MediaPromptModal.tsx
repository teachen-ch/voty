import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { canvasTransform, mediaModal } from "../store";

const MAX_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];

type Tab = "image" | "video";

function readDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ w: img.naturalWidth, h: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error("invalid image"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export function MediaPromptModal({ roomId }: { roomId: string }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("image");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!mediaModal.value) return null;

  function close() {
    mediaModal.value = false;
    setFile(null);
    setVideoUrl("");
    setDescription("");
    setError(null);
    setTab("image");
  }

  function onFile(f: File | null) {
    setError(null);
    if (f && !IMAGE_TYPES.includes(f.type)) {
      setFile(null);
      setError(t("media.fileInvalid"));
      return;
    }
    if (f && f.size > MAX_BYTES) {
      setFile(null);
      setError(t("media.fileTooLarge"));
      return;
    }
    setFile(f);
  }

  function viewportCenter() {
    const { x, y, scale } = canvasTransform.value;
    const jitter = () => (Math.random() - 0.5) * 40;
    return {
      x: (window.innerWidth / 2 - x) / scale + jitter(),
      y: (window.innerHeight / 2 - y) / scale + jitter(),
    };
  }

  async function submit(e: Event) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const data = new FormData();
    data.set("room", roomId);
    data.set("description", description.trim());

    if (tab === "image") {
      if (!file) return;
      let dims;
      try {
        dims = await readDimensions(file);
      } catch {
        setError(t("media.fileInvalid"));
        return;
      }
      const width = Math.max(120, Math.min(dims.w, 480));
      const { x, y } = viewportCenter();
      data.set("kind", "image");
      data.set("file", file);
      data.set("aspect_ratio", String(dims.w / dims.h));
      data.set("width", String(width));
      data.set("pos_x", String(x - width / 2));
      data.set("pos_y", String(y - width / (dims.w / dims.h) / 2));
    } else {
      if (!videoUrl.trim()) return;
      const width = 560;
      const { x, y } = viewportCenter();
      data.set("kind", "video");
      data.set("url", videoUrl.trim());
      data.set("width", String(width));
      data.set("pos_x", String(x - width / 2));
      data.set("pos_y", String(y - (width * 9) / 16 / 2));
    }

    setSubmitting(true);
    try {
      await pb.collection("media_items").create(data);
      close();
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError(
        tab === "video" && status === 400
          ? t("media.videoInvalid")
          : t("media.uploadFailed")
      );
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = tab === "image" ? !!file : !!videoUrl.trim();

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={close}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-full overflow-y-auto p-5 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("media.title")}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={t("common.cancel")}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div role="tablist" className="flex gap-1 border-b border-slate-200">
          {(["image", "video"] as const).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                setTab(id);
                setError(null);
              }}
              className={
                "px-3 py-1.5 text-sm -mb-px border-b-2 " +
                (tab === id
                  ? "border-primary-600 text-primary-700 font-medium"
                  : "border-transparent text-slate-500 hover:text-slate-800")
              }
            >
              {t(id === "image" ? "media.tabImage" : "media.tabVideo")}
            </button>
          ))}
        </div>

        {tab === "image" ? (
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">
              {t("media.file")}
            </span>
            <input
              type="file"
              accept={IMAGE_TYPES.join(",")}
              onChange={(e) => onFile(e.currentTarget.files?.[0] ?? null)}
              className="text-sm"
            />
            <span className="text-xs text-slate-500">
              {t("media.fileHint")}
            </span>
          </label>
        ) : (
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">
              {t("media.videoUrl")}
            </span>
            <input
              type="url"
              value={videoUrl}
              onInput={(e) => setVideoUrl(e.currentTarget.value)}
              placeholder="https://"
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            <span className="text-xs text-slate-500">
              {t("media.videoHint")}
            </span>
          </label>
        )}

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            {t("media.description")}
          </span>
          <input
            value={description}
            onInput={(e) => setDescription(e.currentTarget.value)}
            maxLength={300}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          <span className="text-xs text-slate-500">
            {t("media.descriptionHint")}
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="px-4 py-1.5 rounded text-sm bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? t("common.saving") : t("media.add")}
          </button>
        </div>
      </form>
    </div>
  );
}
