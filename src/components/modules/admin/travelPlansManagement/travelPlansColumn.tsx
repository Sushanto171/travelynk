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
    render: (row) => (
      <div className="font-medium text-sm">{row.title}</div>
    ),
  },

  {
    header: "Owner",
    render: (row) => (
      <UserCard
        id={row.owner.id}
        name={row.owner.name}
        email={row.owner.email}
      />
    ),
  },

  {
    header: "Destination",
    render: (row) => (
      <div className="text-sm">{row.destination}</div>
    ),
  },

  {
    header: "Tour Type",
    render: (row) => (
      <Badge variant="outline" className="uppercase">
        {row.tour_type}
      </Badge>
    ),
  },

  {
    header: "Budget",
    render: (row) => (
      <span>${row.budget}</span>
    ),
  },

  {
    header: "Duration",
    render: (row) => (
      <span>
        {formatTimeDate(row.start_date, false)} –{" "}
        {formatTimeDate(row.end_date, false)}
      </span>
    ),
  },

  {
    header: "Status",
    render: (row) => (
      <Badge className={statusColor[row.status]}>
        {row.status}
      </Badge>
    ),
  },

  {
    header: "Joined",
    render: (row) => row.total_joined ?? 0,
  },

  {
    header: "Created",
    render: (row) => <DateCell date={row.created_at} />,
  },


];
