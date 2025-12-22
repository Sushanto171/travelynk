// Record mapping plan status to shadcn Badge variant
export const planStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "secondary",     // amber → secondary
  ONGOING: "default",       // green → default
  COMPLETED: "default",     // blue → default (can customize if you have a primary variant)
  CANCELLED: "destructive", // red → destructive
}
