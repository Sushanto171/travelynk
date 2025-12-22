import DateCell from '@/components/shared/cell/DateCell';
import { Column } from '@/components/shared/ManagementTable';
import { IInterest } from '@/types/interest.interface';

export const interestColumns: Column<IInterest>[] = [
  {
    header: "Id",
    accessor: (row) => row.id!.toString().slice(0, 7) + "...",
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