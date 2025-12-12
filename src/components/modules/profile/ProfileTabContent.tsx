// components/profile/ProfileTabContent.tsx

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ProfileTabContentProps {
  title: string;
  description?: string;
  children?: ReactNode;
  action?: ReactNode
}

export function ProfileTabContent({
  title,
  description,
  children,
  action
}: ProfileTabContentProps) {
  return (
    <Card className="p-6 space-y-3 border rounded-lg shadow-sm bg-card">
      <div className="flex item-center justify-between w-full ">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div>
    {action}
      </div>
    
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* Optional custom content */}
      {children && <div className="pt-2">{children}</div>}
    </Card>
  );
}
