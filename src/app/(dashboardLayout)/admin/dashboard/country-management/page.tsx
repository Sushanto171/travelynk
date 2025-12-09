import CountryManagementHeader from "@/components/modules/admin/countryManagement/CountryManagementHeader";
import CountryTable from "@/components/modules/admin/countryManagement/CountryTable";
import { getCountry } from "@/services/admin/countryManagement";

export default async function AdminCountryManagementPage() {
  const countries = await getCountry()

  return (
    <div className="space-y-8">

      <CountryManagementHeader />

      <CountryTable countries={countries} />
    </div>
  );
}