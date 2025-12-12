import { Column } from "@/components/shared/ManagementTable";
import { UserCard } from "@/components/shared/UserCard";
import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.interface";
import { Star } from "lucide-react";

export const reviewsColumn: Column<IReview>[] = [
  {
    header: "Reviewer",
    render: (row) => (
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
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.plan.title}</span>
        <span className="text-xs text-muted-foreground">{row.plan.slug}</span>
      </div>
    ),
  },

  {
    header: "Rating",
    render: (row) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
        <span className="font-medium">{row.rating}/5</span>
      </div>
    ),
  },

  {
    header: "Comment",
    render: (row) => (
      <div className="max-w-xs truncate text-sm">
        {row.comment}
      </div>
    ),
  },

  {
    header: "Created",
    render: (row) => <DateCell date={row.created_at} />,
  },

  {
    header: "Updated",
    render: (row) => <DateCell date={row.updated_at} />,
  },

];
