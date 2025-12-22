import DateCell from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import { Badge } from "@/components/ui/badge";
import { formatTimeDate } from "@/lib/formatters";
import { ITraveler } from "@/types/user.interface";

export const travelersColumn: Column<ITraveler>[] = [
  {
    header: "Traveler",
    accessor: (row) => <UserCard email={row.email} name={row.name} id={row.id} profile_photo={row.profile_photo} />,
    sortKey: "name"

  },
  {
    header: "Verified Badge",
    accessor: (row) => (
      <Badge variant={row.has_verified_badge ? "default" : "secondary"}>
        {row.has_verified_badge ? "Verified" : "Unverified"}
      </Badge>
    ),
  },

  {
    header: "Date of birth",
    accessor: (row) => <span>{row.date_of_birth ? formatTimeDate(row?.date_of_birth, false) : "Not Provided"} </span>,
    sortKey: "date_of_birth"
  },
  {
    header: "Contact",
    accessor: (row) => row.contact_number ?? "—"
  }
  ,

  {
    header: "Subscription",
    accessor: (row) => (
      <Badge variant={row.subscription_active ? "default" : "secondary"}>
        {row.subscription_active ? "Active" : "Inactive"}
      </Badge>
    ),
  }
  ,
  {
    header: "Created",
    accessor: (row) => <DateCell date={row.created_at!} />,
    sortKey: "created_at"

  },

  {
    header: "Status",
    accessor: (row) => <StatusBadgeCell isDeleted={row.is_deleted} />
  }
]


//             "id": "31e73c6b-6791-4719-9010-934a717cb76f",
// "name": "traveler8",
// "email": "traveler8@gmail.com",
// "profile_photo": null,
// "bio": null,
// "contact_number": null,
// "date_of_birth": null,
// "address": null,
// "current_location": null,
// "has_verified_badge": false,
// "last_active_at": null,
// "subscription_active": false,
// "created_at": "2025-12-02T13:55:25.540Z",
// "updated_at": "2025-12-02T13:55:25.540Z",
// "is_deleted": false,
// "user_id": "02b9bfed-a474-4719-819b-851f2aa15bfc",