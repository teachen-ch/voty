import type { TFunction } from "i18next";

// "just now" / "12 min ago" / "3 h ago" — for a live room's start time.
export function timeSince(sinceMs: number, t: TFunction): string {
  const min = Math.floor((Date.now() - sinceMs) / 60000);
  if (min < 1) return t("time.justNow");
  if (min < 60) return t("time.minutesAgo", { count: min });
  return t("time.hoursAgo", { count: Math.floor(min / 60) });
}

// "today" / "yesterday" / "3 days ago" / local date — for an idle room's last activity.
export function lastOpenedLabel(
  dateStr: string | undefined,
  t: TFunction
): string {
  if (!dateStr) return "";
  const then = new Date(dateStr);
  if (isNaN(then.getTime())) return "";
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round(
    (startOfDay(new Date()) - startOfDay(then)) / 86400000
  );
  if (days <= 0) return t("time.today");
  if (days === 1) return t("time.yesterday");
  if (days < 30) return t("time.daysAgo", { count: days });
  return then.toLocaleDateString();
}
