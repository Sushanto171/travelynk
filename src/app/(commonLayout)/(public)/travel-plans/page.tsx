import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";

export default async function TravelPlansPage() {
  const plans = await getTravelPlans()
  return (
    <div>

      <PlansViewLayout plans={plans} />
    </div>
  );
}