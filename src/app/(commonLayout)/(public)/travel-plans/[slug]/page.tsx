import { PlanDetailsLayout } from "@/components/modules/travel-plan/details/PlanDetailLayout";
import { getUserAction } from "@/services/auth/getUser.service";
import { getBySlug } from "@/services/traveler/travelPlan.service";


export default async function PlanDetailPage({ params }: { params: { slug: string } }) {
  const {slug} = await params
  const plan = await getBySlug(slug);
  const user = await getUserAction(); // fetch from auth
  console.log(plan);
  return <PlanDetailsLayout plan={plan} currentUserId={user?.traveler?.id || ""} />;
}
