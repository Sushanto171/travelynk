import { Progress } from "@/components/ui/progress";

interface DashboardHeaderProps {
  userName: string;
  profileCompletion: number;
}

export function UserDashboardHeader({ userName, profileCompletion }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {userName} 👋</h1>
        <p className="text-sm text-muted-foreground">
          Complete your profile to get better match recommendations
        </p>
      </div>
      <div className="w-48">
        <Progress value={profileCompletion} />
        <p className="text-xs text-right mt-1">{profileCompletion}% Completed</p>
      </div>
    </div>
  );
}
