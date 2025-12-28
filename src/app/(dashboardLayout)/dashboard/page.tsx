import DashboardOverview from '@/components/modules/dashboard/DashboardOverview';
import { getStats } from '@/services/stats/stats.service';
import {Suspense} from "react"

export default async function UserDashboardOverviewPage() {

  const stats = await getStats()
  return (
    <div>
      <Suspense fallback={"Loading..."}>
      <DashboardOverview stats={stats} />
      </Suspense>
    </div>
  );
}