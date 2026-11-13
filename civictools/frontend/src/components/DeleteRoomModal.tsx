import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import type { RecordModel } from "pocketbase";
import { TrashIcon } from "./Icons";

interface Props {
  room: RecordModel;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteRoomModal({ room, onClose, onDeleted }: Props) {
  const { t } = useTranslation();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);
  const isTemplate = room.is_template === true;
  const isOwner = room.teacher === pb.authStore.model?.id;

  async function confirm() {
    setDeleting(true);
    setError(false);
    try {
      await pb.collection("rooms").delete(room.id);
      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      setError(true);
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-5 flex flex-col gap-4"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <TrashIcon size={20} />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold m-0!">
              {isTemplate
                ? t("deleteRoom.titleTemplate")
                : t("deleteRoom.title")}
            </h2>
            <p className="text-sm font-medium text-slate-700 mt-1 mb-0 break-words">
              {room.name}
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 m-0">
          {isTemplate ? t("deleteRoom.warnTemplate") : t("deleteRoom.warn")}
        </p>
        {isTemplate && !isOwner && (
          <p className="text-sm m-0 rounded-lg p-3 bg-amber-50 border border-amber-200 text-amber-900">
            {t("deleteRoom.notOwner", {
              owner: (room.owner_name as string) || "?",
            })}
          </p>
        )}
        <p className="text-sm font-medium text-red-600 m-0">
          {t("deleteRoom.irreversible")}
        </p>
        {error && <p className="error m-0">{t("deleteRoom.failed")}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={deleting}
            className="btn danger"
          >
            {deleting ? t("deleteRoom.deleting") : t("deleteRoom.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
