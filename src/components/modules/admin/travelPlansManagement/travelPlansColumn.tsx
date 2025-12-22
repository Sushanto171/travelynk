import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { statusColor } from "@/constant/planStatus";
import { formatTimeDate } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travelPlan.interface";

export const travelPlansColumn: Column<ITravelPlan>[] = [
  {
    header: "Title",
    accessor: (row) => (
      <div className="font-medium text-sm">{row.title}</div>
    ),
    sortKey: "created_at"

  },

  {
    header: "Owner",
    accessor: (row) => (
      <UserCard
        id={row.owner.id}
        name={row.owner.name}
        email={row.owner.email}
      />
    ),
  },

  {
    header: "Destination",
    accessor: (row) => (
      <div className="text-sm">{row.destination}</div>
    ),
  },

  {
    header: "Tour Type",
    accessor: (row) => (
      <Badge variant="outline" className="uppercase">
        {row.tour_type}
      </Badge>
    ),
  },

  {
    header: "Budget",
    accessor: (row) => (
      <span>${row.budget}</span>
    ),
    sortKey: "created_at"

  },

  {
    header: "Duration",
    accessor: (row) => (
      <span>
        {formatTimeDate(row.start_date, false)} –{" "}
        {formatTimeDate(row.end_date, false)}
      </span>
    ),
  },

  {
    header: "Status",
    accessor: (row) => (
      <Badge className={statusColor[row.status]}>
        {row.status}
      </Badge>
    ),
  },

  {
    header: "Joined",
    accessor: (row) => row.total_joined ?? 0,
  },

  {
    header: "Created",
    accessor: (row) => <DateCell date={row.created_at} />,
    sortKey: "created_at"
  },


];
