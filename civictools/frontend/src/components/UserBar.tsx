import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { presence, participantColor } from "../store";

interface Props {
  nickname: string;
  role: "teacher" | "student";
  participantId: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserBar({ nickname, role, participantId }: Props) {
  const { t } = useTranslation();
  const color = participantColor(participantId);
  const others = presence.value.filter(
    (p) => p.participantId !== participantId
  );
  const compact = others.length > 5;
  const shown = compact ? others.slice(0, 4) : others;
  const overflow = others.length - shown.length;
  const isTeacher = role === "teacher";

  const pill = (
    <>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ background: color }}
      >
        {initials(nickname)}
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-800">{nickname}</div>
        <div className="text-[11px] text-slate-400">
          {isTeacher ? (
            <>
              {t("userBar.teacher")} · {t("userBar.you")}
            </>
          ) : (
            t("userBar.student")
          )}
        </div>
      </div>
    </>
  );

  const pillClass =
    "flex items-center gap-2 bg-white rounded-2xl shadow border border-slate-200 px-3 py-2";

  return (
    <div className="hidden sm:flex fixed left-4 top-4 items-center gap-2 z-50">
      {isTeacher ? (
        <Link
          href="/dashboard"
          title="Dashboard"
          className={`${pillClass} hover:border-slate-300 cursor-pointer`}
        >
          {pill}
        </Link>
      ) : (
        <div className={pillClass}>{pill}</div>
      )}

      {others.length > 0 && (
        <div
          className={`group flex items-center bg-white rounded-2xl shadow border border-slate-200 px-2 py-2 gap-1 ${compact ? "hover:gap-1.5" : ""}`}
        >
          <div
            className={
              compact
                ? "flex items-center gap-1 group-hover:hidden"
                : "contents"
            }
          >
            {shown.map((p) => (
              <Avatar key={p.participantId} participant={p} />
            ))}
            {overflow > 0 && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 text-slate-600 text-[10px] font-bold">
                +{overflow}
              </div>
            )}
          </div>
          {compact && (
            <div className="hidden group-hover:flex items-center gap-1">
              {others.map((p) => (
                <Avatar key={p.participantId} participant={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Avatar({
  participant,
}: {
  participant: (typeof presence.value)[number];
}) {
  return (
    <div className="relative group/avatar">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
        style={{ background: participantColor(participant.participantId) }}
      >
        {initials(participant.nickname)}
      </div>
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 opacity-0 group-hover/avatar:opacity-100 transition-opacity bg-slate-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
        {participant.nickname}
      </div>
    </div>
  );
}
