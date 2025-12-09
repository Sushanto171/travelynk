export const formatTimeDate = (date: string | Date) => {
  return new Date(date).toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};