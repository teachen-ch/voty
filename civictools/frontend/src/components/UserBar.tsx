import { Link } from "wouter";
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
  const color = participantColor(participantId);
  const others = presence.value.filter(
    (p) => p.participantId !== participantId
  );
  const shown = others.slice(0, 4);
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
          {isTeacher ? "Teacher · Du" : "Student"}
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
        <div className="flex items-center bg-white rounded-2xl shadow border border-slate-200 px-2 py-2 gap-1">
          {shown.map((p) => (
            <div key={p.participantId} className="relative group">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: participantColor(p.participantId) }}
              >
                {initials(p.nickname)}
              </div>
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                {p.nickname}
              </div>
            </div>
          ))}
          {overflow > 0 && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 text-slate-600 text-[10px] font-bold">
              +{overflow}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
