import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card className="flex flex-col justify-between p-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon && <span>{icon}</span>}
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">{value}</span>
      </CardContent>
    </Card>
  );
}
