"use client";

import { Badge } from "@/components/ui/badge";
import { ITravelPlan } from "@/types/travelPlan.interface";

export const PlanMeta = ({ plan }: { plan: ITravelPlan }) => {
  return (
    <div className="space-y-2 border p-4 rounded-xl  ">
      <p>
        <span className="font-medium">Budget:</span> {plan.budget}
      </p>
      <p>
        <span className="font-medium">Owner:</span> {plan.owner.name} ({plan.owner.email})
      </p>
      <p>
        <span className="font-medium">Status:</span> <Badge>{plan.status}</Badge>
      </p>
      <p>
        <span className="font-medium">Tag:</span> {plan.tag}
      </p>
    </div>
  );
};
