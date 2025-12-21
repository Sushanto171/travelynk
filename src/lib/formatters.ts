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

export const formatAmountCentToTaka = (cent: string | number) => {
  const tk = Number(cent) / 100
  return tk.toLocaleString()
}


export function timeAgo(date: string | Date) {
  const now = Date.now();
  const then = new Date(date).getTime();

  const diff = Math.floor((now - then) / 1000); // seconds

  if (diff < 60) {
    return `${diff} sec ago`;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return remainingMinutes > 0
      ? `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} min ago`
      : `${hours} hr${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return remainingHours > 0
    ? `${days} day${days > 1 ? "s" : ""} ${remainingHours} hr ago`
    : `${days} day${days > 1 ? "s" : ""} ago`;
}


export const queryStringFormatter = (query: {
  [key: string]: string[] | string | undefined;
}) => {
  let queryString = "";
  //[["searchTerm","john"],["page",1],["specialties","cardiology"]]
  const queryArray = Object.entries(query).map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
    } else if (value !== undefined) {
      return `${key}=${encodeURIComponent(value)}`;
    }
    return "";
  });
  queryString = queryArray.filter((q) => q !== "").join("&");
  return queryString;
};
