"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FilterContainerProps {
  children: ReactNode;
  className?: string;
}

export function FilterContainer({ children, className }: FilterContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-4",
        "rounded-xl border bg-background p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
