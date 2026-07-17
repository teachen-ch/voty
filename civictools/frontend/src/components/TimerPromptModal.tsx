import { useEffect, useState } from "preact/hooks";
import { pb } from "../pb";
import { canvasTransform, timerModal } from "../store";

const DEFAULT_DURATION = 5 * 60;
const BOARD_WIDTH = 220;
const BOARD_HEIGHT_ESTIMATE = 140;

interface Props {
  roomId: string;
}

function formatMMSS(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseMMSS(str: string): number | null {
  const trimmed = str.trim();
  if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10) * 60;
  const m = trimmed.match(/^(\d+):(\d{1,2})$/);
  if (!m) return null;
  const mins = parseInt(m[1], 10);
  const secs = parseInt(m[2], 10);
  if (secs >= 60) return null;
  return mins * 60 + secs;
}

export function TimerPromptModal({ roomId }: Props) {
  const state = timerModal.value;
  const editing = state?.timer;

  const [value, setValue] = useState(formatMMSS(DEFAULT_DURATION));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) return;
    if (editing) {
      setValue(formatMMSS((editing.duration_seconds as number) || 0));
    } else {
      setValue(formatMMSS(DEFAULT_DURATION));
    }
    setError("");
    setSubmitting(false);
  }, [state]);

  function close() {
    timerModal.value = null;
  }

  async function submit(e: Event) {
    e.preventDefault();
    const duration = parseMMSS(value);
    if (duration === null || duration <= 0) {
      setError("Enter duration as MM:SS or minutes (e.g. 5 or 5:00)");
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await pb.collection("timers").update(editing.id, {
          duration_seconds: duration,
          started: null,
          paused_at: null,
          ended: null,
        });
      } else {
        const { x, y, scale } = canvasTransform.value;
        const wx = (window.innerWidth / 2 - x) / scale - BOARD_WIDTH / 2;
        const wy =
          (window.innerHeight / 2 - y) / scale - BOARD_HEIGHT_ESTIMATE / 2;
        await pb.collection("timers").create({
          room: roomId,
          duration_seconds: duration,
          pos_x: wx,
          pos_y: wy,
        });
      }
      close();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  }

  if (!state) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={close}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {editing ? "Edit timer" : "New timer"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            Duration (MM:SS)
          </span>
          <input
            autoFocus
            value={value}
            onInput={(e) => {
              setValue(e.currentTarget.value);
              setError("");
            }}
            placeholder="5:00"
            className="w-full border border-slate-300 rounded p-2 text-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          {error && <span className="text-xs text-rose-600">{error}</span>}
          {editing && (
            <span className="text-[11px] text-slate-500 italic">
              Saving resets the timer.
            </span>
          )}
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="px-3 py-1.5 rounded text-sm text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-1.5 rounded text-sm bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? "Saving…" : editing ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
