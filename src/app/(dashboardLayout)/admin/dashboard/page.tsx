import AdminAnalytics from '@/components/modules/admin/analytics/AdminAnalytics';
import { getUserAction } from '@/services/auth/getUser.service';
import { getStats } from '@/services/stats/stats.service';
import {Suspense} from "react"
export default async function AdminAnalyticPage(){

  const stats = await getStats()
  const user = await getUserAction()
  return (
    <div>
      <Suspense fallback={"Loading..."}>
      <AdminAnalytics stats={stats} />
      </Suspense>
    </div>
  );
}