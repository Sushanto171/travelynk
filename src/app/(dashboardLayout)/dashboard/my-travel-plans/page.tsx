import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import { getUserAction } from "@/services/auth/getUser.service";
import { getTravelPlans } from "@/services/traveler/travelPlan.service";

export default async function TravelerMyPlanPage() {

  const user = await getUserAction()
  const plans = await getTravelPlans(`owner_id=${user!.traveler?.id}`)
  // const plans = await getTravelPlans()

  return (
    <div>
      <PlansViewLayout plans={plans} />
    </div>
  );
}