import TavelPlansTable from "@/components/modules/admin/travelPlansManagement/TravelPlansTable";
import TravelPlanFilter from "@/components/modules/travel-plan/TravelPlanFilter";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { Suspense } from "react";

export default async function AdminTravelPlansManagementPage() {

  const { data: travelPlans } = await getTravelPlans()
  return (
    <main className="space-y-6">
      <Suspense fallback={<TableSkeleton showActions />} >

        <ManagementPageHeader title="Travel Plans"
          description="Manage all travel plans and update" />

        <TravelPlanFilter />

        <TavelPlansTable travelPlans={travelPlans || []} />
      </Suspense>
    </main>
  );
}