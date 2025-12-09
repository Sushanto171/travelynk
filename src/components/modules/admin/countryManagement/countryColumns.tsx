import DateCell from '@/components/shared/cell/DateCell';
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
    header: "Created",
    render: (row) => <DateCell date={ row.created_at!} />,
  },
]