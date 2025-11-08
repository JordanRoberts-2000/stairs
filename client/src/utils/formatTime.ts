export function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    console.error("invalid date", timestamp);
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
