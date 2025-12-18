import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";

export default async function TravelPlansPage() {
  const plans = await getTravelPlans()
  return (
    <div className="py-12 space-y-8">

      <div></div>

      <PlansViewLayout plans={plans} isPublic />
    </div>
  );
}