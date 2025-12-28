import TravelersTable from "@/components/modules/admin/travelersManagement/TravelersTable";
import TravelerFilter from "@/components/modules/traveler/TravelerFilter";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getCountry } from "@/services/admin/countryManagement";
import { getInterests } from "@/services/admin/interestManagement";
import { getTravelers } from "@/services/traveler/traveler.service";
import { Suspense } from "react";
import { queryStringFormatter } from "@/lib/formatters";
import { ISearchParams } from "@/types/searchParams";
import TablePagination from "@/components/shared/TablePagination";

export default async function AdminTravelPlansManagementPage({
  searchParams,
}: ISearchParams) {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);

  const travelers = await getTravelers(queryString)
  const interests = await getInterests()
  const countries = await getCountry()
  return (
    <div className="space-y-6">
      <Suspense fallback={<TableSkeleton showActions />} >

        <ManagementPageHeader title="All Travelers"
          description="Manage travelers and update"
        />

        <TravelerFilter showPadding={false} />

        <TravelersTable travelers={travelers?.data ?? []} countries={countries} interests={interests} />

         <TablePagination currentPage={Number(travelers?.meta?.page) || 1} totalPages={travelers?.meta?.totalPages || 1} />
      </Suspense>

    </div>
  )
}