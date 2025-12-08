import { getCountry } from "@/services/admin/countryManagement";

export default async function AdminCountryManagementPage() {
  const countries = await getCountry()
  console.log(countries);
  return (
    <div>This is AdminCountryManagementPage Component.</div>
  );
}