"use client";

import { UserCard } from "@/components/shared/UserCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { timeAgo } from "@/lib/formatters";
import { Rating, Review } from "@/types/travelPlan.interface";
import { Star } from "lucide-react";

interface Props {
  reviews: Review[];
  rating: Rating;
}

export function PlanReviews({ reviews, rating }: Props) {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-blue-500" />
          <span>Reviews ({reviews.length})</span>

          {reviews.length > 0 && (
            <span className="flex items-center gap-1 text-yellow-500 font-medium ml-2">
              <Star className="w-4 h-4" />
              {rating.average.toFixed(1)}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <UserCard
                key={r.id}
                id={r.reviewer.id}
                name={r.reviewer.name}
                profile_photo={r.reviewer.profile_photo}
                subText={`⭐ ${r.rating} • ${timeAgo(r.created_at)}`}
              >
                {r.comment}
              </UserCard>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
