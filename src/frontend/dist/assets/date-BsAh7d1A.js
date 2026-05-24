import { D as DateFormat } from "./index-B4wG-Osg.js";
function formatDate(date, format = DateFormat.DDMMYYYY) {
  const d = typeof date === "bigint" ? new Date(Number(date)) : typeof date === "number" ? new Date(date) : date;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  if (format === DateFormat.MMDDYYYY) {
    return `${month}/${day}/${year}`;
  }
  return `${day}/${month}/${year}`;
}
function formatDateTime(date, format = DateFormat.DDMMYYYY) {
  const d = typeof date === "bigint" ? new Date(Number(date)) : typeof date === "number" ? new Date(date) : date;
  const datePart = formatDate(d, format);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${datePart} ${hours}:${minutes}`;
}
export {
  formatDateTime as a,
  formatDate as f
};
