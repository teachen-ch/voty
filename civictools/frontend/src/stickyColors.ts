export const STICKY_COLORS = [
  "#fef08a", // yellow
  "#bbf7d0", // green
  "#bfdbfe", // blue
  "#fecaca", // pink
  "#e9d5ff", // purple
] as const;

export function getStickyColorIndex(note: {
  color_index?: unknown;
  color?: unknown;
}): number {
  const index = Number(note.color_index);
  if (Number.isInteger(index) && index >= 0 && index < STICKY_COLORS.length) {
    return index;
  }
  const legacy = STICKY_COLORS.indexOf(
    note.color as (typeof STICKY_COLORS)[number]
  );
  return legacy >= 0 ? legacy : 0;
}
