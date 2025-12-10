import { Check, X } from "lucide-react";

export function KeyValueRow({
  label,
  value,
}: {
  label: string;
  value: string | boolean | null;
}) {
  const isBoolean = typeof value === "boolean";

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-sm font-medium">{label}</span>

      {isBoolean ? (
        value ? (
          <Check className="text-green-600 w-5 h-5" />
        ) : (
          <X className="text-red-500 w-5 h-5" />
        )
      ) : (
        <span className="text-sm text-muted-foreground">
          {value || "Not provided"}
        </span>
      )}
    </div>
  );
}
