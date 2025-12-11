"use client";

import { Button } from "@/components/ui/button";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

export const PlanOwnerActions = ({ plan }: { plan: ITravelPlan }) => {
  return (
    <div className="space-y-3 flex-shrink-0 w-full lg:w-64">
      <h3 className="font-semibold text-lg">Manage Plan</h3>
      <div className="flex flex-col gap-2">
        <Link href={`/plans/edit/${plan.id}`}>
          <Button className="w-full">Edit Plan</Button>
        </Link>
        <Button variant="destructive" className="w-full">
          Cancel Plan
        </Button>
        <Button variant="outline" className="w-full">
          View Participants
        </Button>
      </div>
    </div>
  );
};
