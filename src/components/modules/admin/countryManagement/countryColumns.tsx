import DateCell from '@/components/shared/cell/DateCell';
import { Column } from '@/components/shared/ManagementTable';
import { ICountry } from '@/types/country.interface';

export const countryColumns: Column<ICountry>[] = [
  {
    header: "Code",
    accessor: (row) => row.code,
    sortKey: "code"
  },
  {
    header: "Name",
    accessor: (row) => row.name,
    sortKey: "name"
  },
  {
    header: "Created",
    accessor: (row) => <DateCell date={row.created_at!} />,
    sortKey: "created_at"

  },
]