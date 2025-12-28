import DashboardOverview from '@/components/modules/dashboard/DashboardOverview';
import { getUserAction } from '@/services/auth/getUser.service';
import { getStats } from '@/services/stats/stats.service';
import {Suspense} from "react"

export default async function UserDashboardOverviewPage() {

  const stats = await getStats()
  const user = await getUserAction()
  return (
    <div>
      <Suspense fallback={"Loading..."}>
      <DashboardOverview stats={stats} user={user!} />
      </Suspense>
    </div>
  );
}