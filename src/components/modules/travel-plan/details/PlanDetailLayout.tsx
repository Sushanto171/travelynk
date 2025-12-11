"use client";

import { PlanHeader } from "./PlanHeader";
import { PlanMeta } from "./PlanMeta";
import { PlanItinerary } from "./PlanItinerary";

import { ITravelPlan } from "@/types/travelPlan.interface";
import { PlanBuddies } from "./PlanBuddies";
import { PlanOwnerActions } from "./PlanOwnerAction";
import { PlanReviews } from "./PlanReview";

export const PlanDetailsLayout = ({
  plan,
  currentUserId,
}: {
  plan: ITravelPlan;
  currentUserId: string;
}) => {
  const isOwner = plan.owner.id === currentUserId;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <PlanHeader plan={plan} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <PlanMeta plan={plan} />
          <PlanItinerary itinerary={plan.itinerary} />
          <PlanBuddies buddies={plan.buddies} />
        </div>

        {isOwner && <PlanOwnerActions plan={plan} />}
      </div>

      <PlanReviews reviews={plan.reviews} rating={plan.rating} />
    </div>
  );
};
