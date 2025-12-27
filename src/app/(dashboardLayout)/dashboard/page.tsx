import DashboardOverview from '@/components/modules/dashboard/DashboardOverview';
import { getStats } from '@/services/stats/stats.service';

export default async function UserDashboardOverviewPage() {

  const stats = await getStats()
  console.log('stats', stats)
  return (
    <div>
      <DashboardOverview stats={stats} />
    </div>
  );
}