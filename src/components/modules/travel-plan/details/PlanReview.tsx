"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Rating, Review } from "@/types/travelPlan.interface";

export const PlanReviews = ({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating: Rating;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Reviews ({reviews.length}) - Average: {rating.average.toFixed(1)}
      </h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border rounded-xl flex gap-4 items-start"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{review.reviewer.name}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    {review.rating}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
