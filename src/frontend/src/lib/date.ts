import { DateFormat } from "../types";

export function formatDate(
  date: Date | number | bigint,
  format: DateFormat = DateFormat.DDMMYYYY,
): string {
  const d =
    typeof date === "bigint"
      ? new Date(Number(date))
      : typeof date === "number"
        ? new Date(date)
        : date;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());

  if (format === DateFormat.MMDDYYYY) {
    return `${month}/${day}/${year}`;
  }
  return `${day}/${month}/${year}`;
}

export function formatDateTime(
  date: Date | number | bigint,
  format: DateFormat = DateFormat.DDMMYYYY,
): string {
  const d =
    typeof date === "bigint"
      ? new Date(Number(date))
      : typeof date === "number"
        ? new Date(date)
        : date;

  const datePart = formatDate(d, format);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${datePart} ${hours}:${minutes}`;
}

export function formatTimestampNanos(
  nanosTimestamp: bigint,
  format: DateFormat = DateFormat.DDMMYYYY,
): string {
  const ms = Number(nanosTimestamp / 1_000_000n);
  return formatDate(new Date(ms), format);
}

export function getDateRangeLabel(period: "today" | "week" | "month"): string {
  const today = new Date();
  if (period === "today") return formatDate(today);
  if (period === "week") {
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    return `${formatDate(start)} – ${formatDate(today)}`;
  }
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  return `${formatDate(start)} – ${formatDate(today)}`;
}
