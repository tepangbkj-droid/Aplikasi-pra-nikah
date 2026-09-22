export function formatDate(value, { withWeekday = false } = {}) {
  if (!value) return "-";
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: withWeekday ? "long" : undefined,
  }).format(date);
}

export function daysBetween(from, to) {
  const start = from ? new Date(from) : new Date();
  const end = new Date(to);
  const ms = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
