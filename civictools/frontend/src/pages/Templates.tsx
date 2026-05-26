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
    <div className="page max-w-4xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/copy/${tpl.slug}`}
              className="card flex flex-col no-underline text-inherit hover:border-slate-300"
            >
              <span className="self-start text-xs font-medium bg-violet-100 text-violet-700 rounded-full px-2.5 py-0.5">
                {t("dashboard.templateTag")}
              </span>
              <h2 className="text-lg font-semibold mt-3 mb-1">{tpl.name}</h2>
              {tpl.description ? (
                <div
                  className="markdown text-slate-700 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(tpl.description),
                  }}
                />
              ) : (
                <p className="text-slate-400 italic text-sm">
                  {t("templates.noDescription")}
                </p>
              )}
              <span className="btn mt-4 self-start">
                {t("templates.create")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
