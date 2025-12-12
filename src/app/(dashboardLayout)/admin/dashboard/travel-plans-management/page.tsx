import TavelPlansTable from "@/components/modules/admin/travelPlansManagement/TravelPlansTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { Suspense } from "react";

export default async function AdminTravelPlansManagementPage() {

  const travelPlans = await getTravelPlans()
  return (
    <main className="space-y-6">
      <Suspense fallback={null} >

        <ManagementPageHeader title="Travel Plans"
          description="Manage all travel plans and update" />

        <TavelPlansTable travelPlans={travelPlans|| []} />
      </Suspense>
    </main>
  );
}