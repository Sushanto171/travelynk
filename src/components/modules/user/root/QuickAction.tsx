"use client"
import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function QuickActionCard({ label, icon, onClick }: QuickActionCardProps) {
  return (
    <Button variant="outline" className="flex flex-col items-center justify-center space-y-1 p-4" onClick={onClick}>
      {icon}
      <span className="text-sm">{label}</span>
    </Button>
  );
}

interface QuickActionsGridProps {
  actions: QuickActionCardProps[];
}

export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{actions.map((a, i) => <QuickActionCard key={i} {...a} />)}</div>;
}
