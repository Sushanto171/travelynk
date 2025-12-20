"use client";

import { ITravelPlan } from "@/types/travelPlan.interface";
import { PlanHeader } from "./PlanHeader";
import { PlanJoinButton } from "./PlanJoinButton";
import { PlanOwnerActions } from "./PlanOwnerAction";
import { PlanRequestManager } from "./PlanRequestManager";
import { PlanTabs } from "./PlanTabs";

export const PlanDetailsLayout = ({
  plan,
  currentUserId,
}: {
  plan: ITravelPlan;
  currentUserId: string;
}) => {
  const isOwner = currentUserId === plan.owner.id;
  const hasRequested = plan.buddies.some(
    (b) => b.traveler.id === currentUserId
  );



  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <PlanHeader plan={plan} />

      {/* Join Button — shown only to non-owner and joinable statuses */}
      {!isOwner && ["PENDING", ].includes(plan.status) && (
        <div className="flex justify-end">
          <PlanJoinButton
            slug={plan.slug}
            traveler_id={currentUserId}
            planId={plan.id}
            alreadyRequested={hasRequested}
          />
        </div>
      )}


      <div className="lg:flex gap-6">
        {/* Main Tabs */}
        <div className="flex-1">
          <PlanTabs plan={plan} />
        </div>


        {/* Right Rail */}
        {isOwner && (
          <div className="lg:w-72 flex-shrink-0 space-y-6 sticky top-24 h-fit">
            <PlanOwnerActions plan={plan} />
            <PlanRequestManager total_requested={plan.total_requested} buddies={plan.buddies} planId={plan.id} />
          </div>
        )}
      </div>
    </div>
  );
};
