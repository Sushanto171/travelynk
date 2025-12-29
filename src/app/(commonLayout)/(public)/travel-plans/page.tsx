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
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Find <span className="text-primary">Plan Trips</span>
        </h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          Join trusted travel plans and connect with real travelers heading to the same destinations.
        </p>

      </div>
      <div>
        <TravelPlanFilter className="mb-6" />
      </div>

      <PlansViewLayout plans={plans?.data || []} isPublic />
      <TablePagination currentPage={Number(plans?.meta?.page) || 1} totalPages={plans?.meta?.totalPages || 1} />
    </div>
  );
}