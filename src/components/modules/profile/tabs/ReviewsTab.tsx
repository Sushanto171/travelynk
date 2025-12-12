"use client";

import EmptyMassage from "@/components/shared/EmptyMassage";
import { UserCard } from "@/components/shared/UserCard";
import { TabsContent } from "@/components/ui/tabs";
import { IReview } from "@/types/review.interface";
import React from "react";
import { ProfileTabContent } from "../ProfileTabContent";


// Props for the tab
interface ReviewsTabProps {
  reviews: IReview[];
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews }) => {
  return (
    <TabsContent value="reviews">
      <ProfileTabContent
        title="User Reviews"
        description="Ratings and feedback from other users."
      >
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <EmptyMassage text=" No reviews available." />
          ) : (
            reviews.map((review) => (
              <UserCard
                key={review.id}
                id={review.reviewer.id}
                name={review.reviewer.name}
                profile_photo={review.reviewer.profile_photo || undefined}
                subText={`Plan: ${review.plan.title} • ${new Date(
                  review.created_at
                ).toLocaleDateString()}`}
              >
                <div className="flex items-center gap-1 mb-1 text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <div className="text-gray-700">{review.comment}</div>
              </UserCard>
            ))
          )}
        </div>
      </ProfileTabContent>
    </TabsContent>
  );
};
