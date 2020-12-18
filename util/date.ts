import dayjs from "dayjs";
import "dayjs/locale/de"; // import locale
import Duration from "dayjs/plugin/duration";

dayjs.locale("de");
dayjs.extend(Duration);

export const Seconds = 1000;
export const Minutes = 60 * Seconds;
export const Hours = 60 * Minutes;
export const Days = 24 * Hours;

const date = dayjs;
export default date;

export function formatFromTo(from: number, to: number): string {
  const s = dayjs(from);
  const e = dayjs(to);
  if (s.endOf("month") === e.endOf("month"))
    return s.format("D.") + " – " + e.format("D. MMM YYYY");
  if (s.endOf("year") === e.endOf("year"))
    return s.format("D. MMM") + " – " + e.format("D. MMM YYYY");
  else return s.format("D. MMM YYYY") + " – " + e.format("D. MMM YYYY");
}

export function formatDate(ts: number): string {
  return isToday(ts) ? "Heute" : dayjs(ts).format("DD.MM.YY");
}

export function formatDuration(ts: number, duration: number): string {
  return formatTime(ts) + " – " + formatTime(ts + duration * 60 * 1000);
}

export function formatFull(ts: number): string {
  return `${date}, ${formatTime(ts)}`;
}

export function formatYear(ts: number | string): string {
  return dayjs(ts).format("YYYY");
}

export function formatTime(ts: number): string {
  return dayjs(ts).format("HH:mm");
}

export function tonight(): number {
  return dayjs().endOf("day").valueOf();
}

export function isToday(ts: number): boolean {
  return dayjs().endOf("day").valueOf() == dayjs(ts).endOf("day").valueOf();
}

/* 
  Format	Output	Description
  YY	  18	Two-digit year
  YYYY	2018	Four-digit year
  M	    1-12	The month, beginning at 1
  MM	  01-12	The month, 2-digits
  MMM	  Jan-Dec	The abbreviated month name
  MMMM	January-December	The full month name
  D	    1-31	The day of the month
  DD	  01-31	The day of the month, 2-digits
  d	    0-6	The day of the week, with Sunday as 0
  dd	  Su-Sa	The min name of the day of the week
  ddd	  Sun-Sat	The short name of the day of the week
  dddd	Sunday-Saturday	The name of the day of the week
  H	    0-23	The hour
  HH	  00-23	The hour, 2-digits
  h	    1-12	The hour, 12-hour clock
  hh	  01-12	The hour, 12-hour clock, 2-digits
  m	    0-59	The minute
  mm	  00-59	The minute, 2-digits
  s	    0-59	The second
  ss	  00-59	The second, 2-digits
  SSS	  000-999	The millisecond, 3-digits
  Z	    +05:00	The offset from UTC, ±HH:mm
  ZZ	  +0500	The offset from UTC, ±HHmm
  A	    AM PM	
  a	    am pm	
*/
