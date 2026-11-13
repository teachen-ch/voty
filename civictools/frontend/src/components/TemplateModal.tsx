import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";
import { tenant } from "../tenant";
import { LockIcon } from "./Icons";

interface Props {
  room: RecordModel;
  onClose: () => void;
  onSaved: (room: RecordModel) => void;
  onCopied?: () => void;
}

export function TemplateModal({ room, onClose, onSaved, onCopied }: Props) {
  const { t } = useTranslation();
  const isTemplate = room.is_template === true;
  const isOwner = room.teacher === pb.authStore.model?.id;
  const owner = (room.owner_name as string) || "?";
  const wasLocked = room.template_locked === true;
  const [locked, setLocked] = useState(wasLocked);
  const [description, setDescription] = useState(
    (room.description as string) || ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [copying, setCopying] = useState(false);
  const [copyId, setCopyId] = useState<string | null>(null);

  async function update(data: Record<string, unknown>) {
    setSaving(true);
    setError(false);
    try {
      const updated = await pb.collection("rooms").update(room.id, data);
      onSaved(updated);
      onClose();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  async function makeCopy() {
    setCopying(true);
    setError(false);
    try {
      const res = await fetch(`/api/civictools/copy/${room.slug}`, {
        method: "POST",
        headers: {
          Authorization: pb.authStore.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: t("template.copyName", { name: room.name }),
          tenant: tenant.id,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { id: string };
      setCopyId(data.id);
      onCopied?.();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setCopying(false);
    }
  }

  function submit(e: Event) {
    e.preventDefault();
    if (!isTemplate) update({ description, is_template: true });
    else if (wasLocked) update({ template_locked: locked });
    else update({ description, template_locked: locked });
  }

  const link = `${window.location.origin}/copy/${room.slug}`;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-full overflow-y-auto p-5 flex flex-col gap-4"
      >
        <div>
          <h2 className="text-lg font-semibold m-0!">
            {isTemplate ? t("template.title") : t("template.promoteTitle")}
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-0">
            {room.name}
            {isTemplate &&
              ` · ${isOwner ? t("template.byYou") : t("template.by", { owner })}`}
          </p>
        </div>

        {!isTemplate && (
          <p className="text-sm text-slate-600 m-0">
            {t("template.promoteHint", { tenant: tenant.name })}
          </p>
        )}

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            {t("template.description")}
          </span>
          <textarea
            value={description}
            disabled={wasLocked}
            onInput={(e) => setDescription(e.currentTarget.value)}
            className="resize-y min-h-28"
          />
        </label>

        {isTemplate && (
          <p className="text-xs text-slate-500 break-all m-0">
            {t("template.link")}:{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
        )}

        {isTemplate && (
          <label className="flex items-start gap-2.5 text-sm rounded-lg border border-slate-200 p-3 cursor-pointer">
            <input
              type="checkbox"
              checked={locked}
              onChange={(e) => setLocked(e.currentTarget.checked)}
              className="w-auto! shrink-0 p-0! mt-0.5"
            />
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800 inline-flex items-center gap-1.5">
                <LockIcon size={14} />
                {t("template.lock")}
              </span>
              <span className="text-xs text-slate-500">
                {wasLocked ? t("template.lockedHint") : t("template.lockHint")}
              </span>
            </span>
          </label>
        )}

        {error && <p className="error m-0">{t("template.failed")}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
          >
            {t("common.cancel")}
          </button>
          <button type="submit" disabled={saving} className="btn">
            {saving
              ? t("common.saving")
              : isTemplate
                ? t("common.save")
                : t("template.publish")}
          </button>
        </div>

        {isTemplate && !wasLocked && (
          <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
            {!confirmRemove ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600">
                  {t("template.removeHint")}
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmRemove(true)}
                  className="shrink-0 px-3 py-1.5 rounded text-sm text-red-600 border border-red-200 hover:bg-red-50"
                >
                  {t("template.remove")}
                </button>
              </div>
            ) : (
              <div
                className={`rounded-lg p-3 flex flex-col gap-3 text-sm ${
                  isOwner
                    ? "bg-slate-50 border border-slate-200 text-slate-700"
                    : "bg-amber-50 border border-amber-200 text-amber-900"
                }`}
              >
                {isOwner ? (
                  <p className="m-0">{t("template.removeOwner")}</p>
                ) : (
                  <>
                    <p className="m-0 font-semibold">
                      {t("template.removeWarnTitle")}
                    </p>
                    <p className="m-0">{t("template.removeWarn", { owner })}</p>
                    {copyId ? (
                      <p className="m-0 text-emerald-700">
                        {t("template.copyDone")}{" "}
                        <a href={`/room/${copyId}`}>{t("template.openCopy")}</a>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={makeCopy}
                        disabled={copying}
                        className="btn self-start"
                      >
                        {copying ? t("template.copying") : t("template.copy")}
                      </button>
                    )}
                  </>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmRemove(false)}
                    className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => update({ is_template: false })}
                    className="btn danger"
                  >
                    {isOwner || copyId
                      ? t("template.removeConfirm")
                      : t("template.removeAnyway")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
