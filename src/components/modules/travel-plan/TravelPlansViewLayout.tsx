// components/plan/layout/PlansViewLayout.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Inbox } from "lucide-react";
import { PlanCard } from "./TravelPlanCard";
import TravelPlanCreateUpdateDialog from "./TravelPlanFormDialog";

export const PlansViewLayout = ({ plans, isTab = false, isPublic = false }: { plans: ITravelPlan[], isTab?: boolean, isPublic?: boolean }) => {
  return (
    <div className={cn("mx-auto max-w-7xl space-y-8", isPublic ? "px-4 sm:px-6 lg:px-8 " : "")}>
      {/* Plans Grid or Empty State */}
      {plans.length > 0 ? (
        <div className={cn(`grid grid-cols-1 md:grid-cols-2  gap-6`, isTab ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <Card className="py-16 border-dashed shadow-none text-center">
          <CardContent className="space-y-4">
            <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="text-2xl font-semibold ">
              No Travel Plans Found
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You haven’t joined any travel plans. Explore available plans and request to join trips that match your interests.
            </p>
            {!isPublic && <TravelPlanCreateUpdateDialog />}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
