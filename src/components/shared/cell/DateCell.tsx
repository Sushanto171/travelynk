import { formatTimeDate } from "@/lib/formatters";

export default function DateCell({ date }: { date: Date | string }) {
  return <span className="text-sm">{formatTimeDate(date!)}</span>;
}
