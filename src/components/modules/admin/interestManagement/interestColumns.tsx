import DateCell from '@/components/shared/cell/DateCell';
import { Column } from '@/components/shared/ManagementTable';
import { IInterest } from '@/types/interest.interface';

export const interestColumns: Column<IInterest>[] = [
  {
    header: "Id",
    render: (row) => row.id.toString().slice(0, 7) + "...",
  },
  {
    header: "Name",
    render: (row) => row.name,
  },
  {
    header: "Created",
    render: (row) => <DateCell date={row.created_at!} />,
  },
]