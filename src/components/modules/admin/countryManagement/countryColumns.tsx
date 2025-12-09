import { Column } from '@/components/shared/ManagementTable';
import { ICountry } from '@/types/country.interface';

export const countryColumns: Column<ICountry>[] = [
  {
    header: "Code",
    render: (row) => row.code,
  },
  {
    header: "Name",
    render: (row) => row.name,
  },
  {
    header: "Create",
    render: (row) => row.created_at,
  },
]