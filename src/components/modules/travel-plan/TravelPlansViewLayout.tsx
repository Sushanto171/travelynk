// components/plan/layout/PlansViewLayout.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Inbox } from "lucide-react";
import { PlanCard } from "./TravelPlanCard";
import TravelPlanCreateUpdateDialog from "./TravelPlanFormDialog";

export const PlansViewLayout = ({ plans }: { plans: ITravelPlan[] }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Plans Grid or Empty State */}
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <Card className="py-16 border-dashed shadow-none text-center">
          <CardContent className="space-y-4">
            <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="text-2xl font-semibold text-gray-900">
              No Travel Plans Yet
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You haven’t joined any travel plans. Explore available plans and request to join trips that match your interests.
            </p>
            <TravelPlanCreateUpdateDialog />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
