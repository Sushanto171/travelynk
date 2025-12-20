"use client";

import { UserCard } from "@/components/shared/UserCard";
import { formatTimeDate } from "@/lib/formatters";
import { Rating, Review } from "@/types/travelPlan.interface";
import { Star } from "lucide-react";

export const PlanReviews = ({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating: Rating;
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-500" />

        Reviews ({reviews.length})
        {reviews.length > 0 && (
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <Star className="w-4 h-4" /> {rating.average.toFixed(1)}
          </span>
        )}
      </h2>

      {/* No Reviews */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <UserCard
              key={r.reviewer.id}
              id={r.reviewer.id}
              name={r.reviewer.name}
              profile_photo={r.reviewer.profile_photo}
              subText={`⭐ ${r.rating} • ${formatTimeDate(r.created_at, false)}`}
            >
              {r.comment}

            </UserCard>
          ))}

        </div>
      )}
    </div>
  );
};
