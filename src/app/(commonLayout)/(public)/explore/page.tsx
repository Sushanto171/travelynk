import { ExplorePageLayout } from "@/components/modules/explore/ExplorePageLayout";
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

  const {data:travelers} = await getTravelers(queryString)
  const interests = await getInterests()
  const countries = await getCountry()

  return (
    <div>
      <ExplorePageLayout travelers={travelers ||[]} />

    </div>
  );
}