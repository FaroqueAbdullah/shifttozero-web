/**
 * Date formatting for content dates. Always UTC so server and browser render
 * identical strings (no hydration mismatch) regardless of the viewer's timezone.
 */
const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts });

const short = fmt({ month: "short", day: "2-digit", year: "numeric" }); // Oct 12, 2026
const long = fmt({ month: "long", day: "2-digit", year: "numeric" }); // October 12, 2026
const month = fmt({ month: "short" }); // Oct
const day = fmt({ day: "2-digit" }); // 12
const monthYear = fmt({ month: "long", year: "numeric" }); // November 2026

export const formatDate = (iso?: string, style: "short" | "long" = "short") =>
  iso ? (style === "long" ? long : short).format(new Date(iso)) : "";

export const monthShort = (iso: string) => month.format(new Date(iso));
export const dayOfMonth = (iso: string) => day.format(new Date(iso));
export const formatMonthYear = (iso: string) => monthYear.format(new Date(iso));
/** Sortable key for grouping by month, e.g. "2026-11". */
export const monthKey = (iso: string) => iso.slice(0, 7);

export const readTimeLabel = (minutes?: number) => `${Math.max(1, minutes ?? 1)} min read`;
