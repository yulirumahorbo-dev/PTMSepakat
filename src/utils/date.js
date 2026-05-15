export function formatDate(dateStr, locale = "id-ID") {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
