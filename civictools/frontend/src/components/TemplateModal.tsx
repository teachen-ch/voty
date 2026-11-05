import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";

interface Props {
  room: RecordModel;
  onClose: () => void;
  onSaved: (room: RecordModel) => void;
}

export function TemplateModal({ room, onClose, onSaved }: Props) {
  const { t } = useTranslation();
  const [isTemplate, setIsTemplate] = useState(room.is_template === true);
  const [description, setDescription] = useState(
    (room.description as string) || ""
  );
  const [saving, setSaving] = useState(false);

  async function save(e: Event) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await pb
        .collection("rooms")
        .update(room.id, { is_template: isTemplate, description });
      onSaved(updated);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-full overflow-y-auto p-5 flex flex-col gap-4"
      >
        <h2 className="text-lg font-semibold m-0!">{t("template.title")}</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isTemplate}
            onChange={(e) => setIsTemplate(e.currentTarget.checked)}
            className="w-auto! shrink-0 p-0!"
          />
          {t("template.isTemplate")}
        </label>
        <p className="text-xs text-slate-500 m-0">{t("template.hint")}</p>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            {t("template.description")}
          </span>
          <textarea
            value={description}
            onInput={(e) => setDescription(e.currentTarget.value)}
            className="resize-y min-h-28"
          />
        </label>
        {room.is_template && (
          <p className="text-xs text-slate-500 break-all m-0">
            {t("template.link")}: {window.location.origin}/copy/{room.slug}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
          >
            {t("common.cancel")}
          </button>
          <button type="submit" disabled={saving} className="btn">
            {saving ? t("common.saving") : t("common.save")}
          </button>
        </div>
      </form>
    </div>
  );
}
