import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { renderMarkdown } from "../util/markdown";
import { Header } from "../components/Header";
import { isTeacher } from "../store";
import type { RecordModel } from "pocketbase";

export function Templates() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<RecordModel[] | null>(null);

  useEffect(() => {
    pb.collection("rooms")
      .getFullList({
        filter: `is_template = true && slug != ""`,
        sort: "-created",
      })
      .then(setTemplates)
      .catch(() => setTemplates([]));
  }, []);

  if (templates === null) {
    return (
      <div className="page max-w-2xl">
        <Header />
        <p>{t("room.loading")}</p>
      </div>
    );
  }

  return (
    <div className="page max-w-2xl">
      <Header />
      {isTeacher.value && (
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            {t("breadcrumb.home")}
          </Link>
        </nav>
      )}
      <h1>{t("templates.title")}</h1>
      {templates.length === 0 ? (
        <p className="text-slate-500">{t("templates.empty")}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {templates.map((tpl) => (
            <div key={tpl.id} className="card">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">{tpl.name}</h2>
                  {tpl.description ? (
                    <div
                      className="markdown text-slate-700"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(tpl.description),
                      }}
                    />
                  ) : (
                    <p className="text-slate-400 italic">
                      {t("templates.noDescription")}
                    </p>
                  )}
                </div>
                <Link href={`/copy/${tpl.slug}`} className="btn">
                  {t("templates.create")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
