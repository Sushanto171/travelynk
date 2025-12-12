import TravelersTable from "@/components/modules/admin/travelersManagement/TravelersTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getTravelers } from "@/services/traveler/traveler.service";
import { Suspense } from "react";

export default async function AdminTravelPlansManagementPage() {

  const travelers = await getTravelers()

  return (
    <div className="space-y-6">
      <Suspense fallback={null} >

        <ManagementPageHeader title="All Travelers"
          description="Manage travelers and update"
        />

        <TravelersTable travelers={travelers?.data ?? []} />
      </Suspense>

    </div>
  )
}