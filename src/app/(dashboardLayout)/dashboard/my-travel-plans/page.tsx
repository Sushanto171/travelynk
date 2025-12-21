import TravelPlanCreateUpdateDialog from "@/components/modules/travel-plan/TravelPlanFormDialog";
import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getUserAction } from "@/services/auth/getUser.service";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";

export default async function TravelerMyPlanPage() {

  const user = await getUserAction()
  const {data:plans} = await getTravelPlans(`owner_id=${user!.traveler?.id}`)
  // const plans = await getTravelPlans()

  return (
    <div className="space-y-6">
      <ManagementPageHeader title="My Travel Plans" >

        <TravelPlanCreateUpdateDialog />
      </ManagementPageHeader>


      <PlansViewLayout plans={plans||[]} />
    </div>
  );
}