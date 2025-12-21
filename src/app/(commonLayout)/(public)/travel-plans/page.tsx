import TravelPlanFilter from "@/components/modules/travel-plan/TravelPlanFilter";
import { PlansViewLayout } from "@/components/modules/travel-plan/TravelPlansViewLayout";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getTravelPlans } from "@/services/travelPlan/travelPlan.service";
import { ISearchParams } from "@/types/searchParams";

export default async function TravelPlansPage({
  searchParams,
}: ISearchParams) {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);
  const plans = await getTravelPlans(queryString)
  return (
    <div className="py-12 space-y-8">

      <div>
        <TravelPlanFilter className="mb-6" />
      </div>

      <PlansViewLayout plans={plans?.data || []} isPublic />
      <TablePagination currentPage={Number(plans?.meta?.page) || 1} totalPages={plans?.meta?.totalPages || 1} />
    </div>
  );
}