import TavelPlansTable from "@/components/modules/admin/travelPlansManagement/TravelPlansTable";
import TravelPlanFilter from "@/components/modules/travel-plan/TravelPlanFilter";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { Suspense } from "react";
import { queryStringFormatter } from "@/lib/formatters";
import { ISearchParams } from "@/types/searchParams";
import TablePagination from "@/components/shared/TablePagination";

export default async function AdminTravelPlansManagementPage({  searchParams,
}: ISearchParams) {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);
  const { data: travelPlans, meta } = await getTravelPlans(queryString)
  return (
    <main className="space-y-6">
      <Suspense fallback={<TableSkeleton showActions />} >

        <ManagementPageHeader title="Travel Plans"
          description="Manage all travel plans and update" />

        <TravelPlanFilter showPadding={false} />

        <TavelPlansTable travelPlans={travelPlans || []} />

          <TablePagination currentPage={Number(meta?.page) || 1} totalPages={meta?.totalPages || 1} />
      </Suspense>
    </main>
  );
}