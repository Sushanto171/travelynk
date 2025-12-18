/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { formatAmountCentToTaka } from "@/lib/formatters";
import { ISubscription } from "@/types/subscription.interface";

export const subscriptionColumn: Column<ISubscription>[] = [
  {
    header: "Subscriber",
    render: (row) => (
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
    render: (row) => (
      <Badge variant="outline" className="uppercase">
        {row.plan_type as any}
      </Badge>
    ),
  },

  {
    header: "Status",
    render: (row) => (
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
    render: (row) => (
      <Badge variant={row.is_active ? "default" : "secondary"}>
        {row.is_active ? "Yes" : "No"}
      </Badge>
    ),
  },

  {
    header: "Amount",
    render: (row) => {
      const payment = row.payments?.[0];
      return payment ? `৳${formatAmountCentToTaka(payment.amount)}` : "—";
    },
  },

  {
    header: "Start Date",
    render: (row) => <DateCell date={row.start_date} />,
  },

  {
    header: "End Date",
    render: (row) => <DateCell date={row.end_date} />,
  },

  {
    header: "Created",
    render: (row) => <DateCell date={row.created_at} />,
  },

];
