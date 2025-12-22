/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { ISubscription } from "@/types/subscription.interface";

export const subscriptionColumn: Column<ISubscription>[] = [
  {
    header: "Subscriber",
    accessor: (row) => (
      <UserCard
        id={row.subscriber.id}
        name={row.subscriber.name}
        email={row.subscriber.email}
        profile_photo={row.subscriber.profile_photo}
      />
    ),
  },

  {
    header: "Plan",
    accessor: (row) => (
      <Badge variant="outline" className="uppercase">
        {row.plan_type as any}
      </Badge>
    ),
  },

  {
    header: "Status",
    accessor: (row) => (
      <Badge
        variant={
          row.payment_status === "PAID"
            ? "default"
            : row.payment_status === "FAILED"
              ? "destructive"
              : "secondary"
        }
      >
        {row.payment_status}
      </Badge>
    ),
  },

  {
    header: "Active",
    accessor: (row) => (
      <Badge variant={row.is_active ? "default" : "secondary"}>
        {row.is_active ? "Yes" : "No"}
      </Badge>
    ),
  },

  {
    header: "Start Date",
    accessor: (row) => <DateCell date={row.start_date} />,
    sortKey: "start_date"

  },

  {
    header: "End Date",
    accessor: (row) => <DateCell date={row.end_date} />,
    sortKey: "end_date"

  },

  {
    header: "Created",
    accessor: (row) => <DateCell date={row.created_at} />,
    sortKey: "created_at"

  },

];
