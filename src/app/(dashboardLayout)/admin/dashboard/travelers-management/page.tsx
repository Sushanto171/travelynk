import TravelersTable from "@/components/modules/admin/travelersManagement/TravelersTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getCountry } from "@/services/admin/countryManagement";
import { getInterests } from "@/services/admin/interestManagement";
import { getTravelers } from "@/services/traveler/traveler.service";
import { Suspense } from "react";

export default async function AdminTravelPlansManagementPage() {

  const travelers = await getTravelers()
  const interests = await getInterests()
  const countries = await getCountry()
  return (
    <div className="space-y-6">
      <Suspense fallback={<TableSkeleton showActions />} >

        <ManagementPageHeader title="All Travelers"
          description="Manage travelers and update"
        />

        <TravelersTable travelers={travelers?.data ?? []} countries={countries} interests={interests} />
      </Suspense>

    </div>
  )
}