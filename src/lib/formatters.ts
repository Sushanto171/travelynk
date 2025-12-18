export const formatTimeDate = (
  date: string | Date,
  showTime: boolean = true
) => {
  const baseOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = showTime
    ? {
      hour: "2-digit",
      minute: "2-digit",
    }
    : {};

  return new Date(date).toLocaleString("en-US", {
    ...baseOptions,
    ...timeOptions,
  });
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
};

export const firstLatterUppercase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export const formatAmountCentToTaka = (cent: string |number) => {
  const tk = Number(cent) / 100
  return tk.toLocaleString()
}