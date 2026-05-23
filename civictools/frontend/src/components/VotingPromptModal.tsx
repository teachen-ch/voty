import { useEffect, useState } from "preact/hooks";
import { pb } from "../pb";
import { canvasTransform, votingModal } from "../store";

const DEFAULT_OPTIONS = ["Yes", "No"];
const MAX_OPTIONS = 4;
const BOARD_WIDTH = 460;
const BOARD_HEIGHT_ESTIMATE = 260;

interface Props {
  roomId: string;
}

export function VotingPromptModal({ roomId }: Props) {
  const state = votingModal.value;
  const editing = state?.voting;

  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<string[]>([...DEFAULT_OPTIONS]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!state) return;
    if (editing) {
      setPrompt((editing.prompt as string) ?? "");
      const opts = editing.options;
      setOptions(
        Array.isArray(opts) && opts.length > 0
          ? (opts as string[])
          : [...DEFAULT_OPTIONS]
      );
    } else {
      setPrompt("");
      setOptions([...DEFAULT_OPTIONS]);
    }
    setSubmitting(false);
  }, [state]);

  function close() {
    votingModal.value = null;
  }

  function updateOption(i: number, v: string) {
    setOptions(options.map((o, idx) => (idx === i ? v : o)));
  }

  function addOption() {
    if (options.length < MAX_OPTIONS) setOptions([...options, ""]);
  }

  function removeOption(i: number) {
    if (options.length > 2) setOptions(options.filter((_, idx) => idx !== i));
  }

  async function submit(e: Event) {
    e.preventDefault();
    const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
    if (cleanOptions.length < 2) return;
    setSubmitting(true);

    try {
      if (editing) {
        await pb.collection("votings").update(editing.id, {
          prompt: prompt.trim(),
          options: cleanOptions,
        });
      } else {
        const { x, y, scale } = canvasTransform.value;
        const wx = (window.innerWidth / 2 - x) / scale - BOARD_WIDTH / 2;
        const wy =
          (window.innerHeight / 2 - y) / scale - BOARD_HEIGHT_ESTIMATE / 2;
        await pb.collection("votings").create({
          room: roomId,
          prompt: prompt.trim(),
          options: cleanOptions,
          config: { closed: false, show_results: false },
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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-5 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {editing ? "Edit voting" : "New voting"}
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
            Question (markdown supported)
          </span>
          <textarea
            autoFocus
            value={prompt}
            onInput={(e) => setPrompt(e.currentTarget.value)}
            placeholder="What should the class vote on?"
            className="w-full border border-slate-300 rounded p-2 text-sm resize-y min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">
            Options ({options.length}/{MAX_OPTIONS})
          </span>
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={opt}
                onInput={(e) => updateOption(i, e.currentTarget.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  title="Remove option"
                  className="text-slate-400 hover:text-red-600 px-2"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {options.length < MAX_OPTIONS && (
            <button
              type="button"
              onClick={addOption}
              className="self-start text-sm text-blue-600 hover:text-blue-800"
            >
              + Add option
            </button>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-2">
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
            className="px-4 py-1.5 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Saving…" : editing ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
