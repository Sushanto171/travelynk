import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.interface";
import { Star } from "lucide-react";
import Link from "next/link";

export const reviewsColumn: Column<IReview>[] = [
  {
    header: "Reviewer",
    accessor: (row) => (
      <UserCard
        id={row.reviewer.id}
        name={row.reviewer.name}
        email={row.reviewer.email}
        profile_photo={row.reviewer.profile_photo}
      />
    ),
  },

  {
    header: "Plan",
    accessor: (row) => (
      <Link href={`/travel-plans/${row?.plan?.slug}`}>
        <span className="font-medium text-sm hover:underline truncate">{row.plan.title}</span>
      </Link>
    ),
  },

  {
    header: "Rating",
    accessor: (row) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
        <span className="font-medium">{row.rating}/5</span>
      </div>
    ),
    sortKey: "rating"
  },

  {
    header: "Comment",
    accessor: (row) => (
      <div className="max-w-xs truncate text-sm">
        {row.comment}
      </div>
    ),
  },

  {
    header: "Created",
    accessor: (row) => <DateCell date={row.created_at} />,
    sortKey: "created_at"
  },

  {
    header: "Updated",
    accessor: (row) => <DateCell date={row.updated_at} />,
    sortKey: "updated_at"

  },

];
