import { useEffect, useState } from "preact/hooks";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { renderMarkdown } from "../util/markdown";
import { isTeacher } from "../store";
import type { RecordModel } from "pocketbase";

type Outline = {
  discussions: RecordModel[];
  votings: RecordModel[];
  timers: RecordModel[];
  ballots: RecordModel[];
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CopyTemplate({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [template, setTemplate] = useState<RecordModel | null>(null);
  const [outline, setOutline] = useState<Outline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const room = await pb
          .collection("rooms")
          .getFirstListItem(`slug = "${slug}" && is_template = true`);
        const filter = `room = "${room.id}"`;
        const [discussions, votings, timers, ballots] = await Promise.all([
          pb.collection("discussion_boards").getFullList({ filter }),
          pb.collection("votings").getFullList({ filter }),
          pb.collection("timers").getFullList({ filter }),
          pb.collection("ballots").getFullList({ filter }),
        ]);
        if (cancelled) return;
        setTemplate(room);
        setOutline({ discussions, votings, timers, ballots });
      } catch {
        if (!cancelled) setError(t("copy.notFound"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, t]);

  async function handleCopy() {
    if (!isTeacher.value) {
      navigate(`/login?next=${encodeURIComponent(`/copy/${slug}`)}`);
      return;
    }
    setCopying(true);
    setError(null);
    try {
      const res = await fetch(`/api/civictools/copy/${slug}`, {
        method: "POST",
        headers: { Authorization: pb.authStore.token },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { id: string };
      navigate(`/room/${data.id}`);
    } catch {
      setError(t("copy.failed"));
      setCopying(false);
    }
  }

  if (error) {
    return (
      <div className="page max-w-2xl">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!template || !outline) {
    return (
      <div className="page max-w-2xl">
        <p>{t("room.loading")}</p>
      </div>
    );
  }

  const empty =
    outline.discussions.length === 0 &&
    outline.votings.length === 0 &&
    outline.timers.length === 0 &&
    outline.ballots.length === 0;

  return (
    <div className="page max-w-2xl">
      <h1>{template.name}</h1>
      {template.description && (
        <div
          className="markdown text-slate-700 mb-4"
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(template.description),
          }}
        />
      )}

      <h2 className="text-lg font-semibold mt-6 mb-2">
        {t("copy.outlineTitle")}
      </h2>
      {empty ? (
        <p className="text-slate-500">{t("copy.empty")}</p>
      ) : (
        <ul className="flex flex-col gap-2 mb-6">
          {outline.discussions.map((d) => (
            <li key={d.id} className="card">
              <strong>{t("copy.itemDiscussion")}:</strong>{" "}
              {d.prompt || <em>{t("copy.noPrompt")}</em>}
            </li>
          ))}
          {outline.votings.map((v) => (
            <li key={v.id} className="card">
              <strong>{t("copy.itemVoting")}:</strong>{" "}
              {v.prompt || <em>{t("copy.noPrompt")}</em>}
            </li>
          ))}
          {outline.timers.map((tm) => (
            <li key={tm.id} className="card">
              <strong>{t("copy.itemTimer")}:</strong>{" "}
              {formatDuration(tm.duration_seconds)}
            </li>
          ))}
          {outline.ballots.map((b) => (
            <li key={b.id} className="card">
              <strong>{t("copy.itemBallot")}:</strong>{" "}
              {b.question || <em>{t("copy.noPrompt")}</em>}
            </li>
          ))}
        </ul>
      )}

      <button className="btn w-full" onClick={handleCopy} disabled={copying}>
        {copying ? t("copy.creating") : t("copy.create")}
      </button>
    </div>
  );
}
