import TravelPlanFilter from "@/components/modules/travel-plan/TravelPlanFilter";
import TravelPlanCreateUpdateDialog from "@/components/modules/travel-plan/TravelPlanFormDialog";
import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getUserAction } from "@/services/auth/getUser.service";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { queryStringFormatter } from "@/lib/formatters";
import { ISearchParams } from "@/types/searchParams";
import TablePagination from "@/components/shared/TablePagination";

export default async function TravelerMyPlanPage({
  searchParams,
}: ISearchParams) {
  const searchParamsObj = await searchParams;

  // Build query string from filters
  const queryString = queryStringFormatter(searchParamsObj);

  const user = await getUserAction();
  const ownerId = user!.traveler?.id;

  // ✅ Merge owner_id + filters
  const finalQueryString = queryString
    ? `owner_id=${ownerId}&${queryString}`
    : `owner_id=${ownerId}`;

  const { data: plans , meta} = await getTravelPlans(finalQueryString);

  return (
    <div className="space-y-6">
      <ManagementPageHeader title="My Travel Plans">
        <TravelPlanCreateUpdateDialog />
      </ManagementPageHeader>

      <TravelPlanFilter className="w-full" showPadding={false} />

      <PlansViewLayout plans={plans || []} />

       <TablePagination currentPage={Number(meta?.page) || 1} totalPages={meta?.totalPages || 1} />
    </div>
  );
}
