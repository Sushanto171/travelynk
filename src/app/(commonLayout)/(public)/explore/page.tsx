import { ExplorePageLayout } from "@/components/modules/explore/ExplorePageLayout";
import TravelerFilter from "@/components/modules/traveler/TravelerFilter";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getCountry } from "@/services/admin/countryManagement";
import { getInterests } from "@/services/admin/interestManagement";
import { getTravelers } from "@/services/traveler/traveler.service";
import { ISearchParams } from "@/types/searchParams";


export default async function ExploreTravelPlansPage({
  searchParams,
}: ISearchParams) {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);

  const { data: travelers, meta } = await getTravelers(queryString)
  const interests = await getInterests()
  const countries = await getCountry()

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Explore <span className="text-primary">Travelers</span>
        </h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          Connect with travelers who share your interests
        </p>
      </div>

      <TravelerFilter showPadding={false} />


      <ExplorePageLayout travelers={travelers || []} />


      <TablePagination currentPage={Number(meta?.page) || 1} totalPages={meta?.totalPages || 1} />
    </div>
  );
}