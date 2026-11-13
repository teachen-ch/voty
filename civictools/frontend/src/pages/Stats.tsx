import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { Header } from "../components/Header";
import { LockIcon } from "../components/Icons";
import { tenant } from "../tenant";
import { lastOpenedLabel } from "../util/time";

interface TemplateStat {
  id: string;
  name: string;
  locked: boolean;
  copies: number;
  students: number;
  lastCopied: string;
}

interface TenantStats {
  tenant: string;
  teachers: number;
  activeTeachers: number;
  rooms: number;
  activeRooms: number;
  students: number;
  templates: TemplateStat[];
}

function Tile({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <div className="card flex flex-col gap-1 p-4!">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-3xl font-semibold text-slate-800 tabular-nums">
        {value.toLocaleString()}
      </span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
    </div>
  );
}

export function Stats() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<TenantStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    pb.send<TenantStats>("/api/civictools/stats", {})
      .then(setStats)
      .catch(() => setFailed(true));
  }, []);

  const maxCopies = Math.max(
    1,
    ...(stats?.templates.map((s) => s.copies) ?? [])
  );

  return (
    <div className="page">
      <Header />
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/dashboard" className="text-primary-600 hover:underline">
          {t("breadcrumb.home")}
        </Link>
      </nav>
      <h1>{t("stats.title", { tenant: tenant.name })}</h1>

      {failed ? (
        <p className="error">{t("stats.failed")}</p>
      ) : !stats ? (
        <p className="text-slate-500">{t("room.loading")}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <Tile
              label={t("stats.teachers")}
              value={stats.teachers}
              sub={t("stats.active30", { count: stats.activeTeachers })}
            />
            <Tile
              label={t("stats.rooms")}
              value={stats.rooms}
              sub={t("stats.active30", { count: stats.activeRooms })}
            />
            <Tile label={t("stats.students")} value={stats.students} />
          </div>

          <h2 className="text-lg font-semibold mt-10 mb-1!">
            {t("stats.templates")}
          </h2>
          <p className="text-sm text-slate-500 mt-0 mb-3">
            {t("stats.templatesHint")}
          </p>
          {stats.templates.length === 0 ? (
            <p className="text-slate-500">{t("templates.empty")}</p>
          ) : (
            <div className="card p-0! overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="font-medium px-4 py-3">
                      {t("stats.template")}
                    </th>
                    <th className="font-medium px-4 py-3 w-2/5">
                      {t("stats.copies")}
                    </th>
                    <th className="font-medium px-4 py-3 text-right">
                      {t("stats.students")}
                    </th>
                    <th className="font-medium px-4 py-3 text-right whitespace-nowrap">
                      {t("stats.lastCopied")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.templates.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/room/${s.id}`}
                          className="font-medium text-slate-800 hover:underline inline-flex items-center gap-1.5"
                        >
                          {s.locked && (
                            <LockIcon
                              size={13}
                              className="text-amber-600 shrink-0"
                            />
                          )}
                          {s.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-slate-100 min-w-16">
                            <div
                              className="h-2 rounded-full bg-violet-500"
                              style={{
                                width: `${(s.copies / maxCopies) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="tabular-nums w-8 text-right">
                            {s.copies}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {s.students}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500 whitespace-nowrap">
                        {s.lastCopied ? lastOpenedLabel(s.lastCopied, t) : "–"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
