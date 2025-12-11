// components/plan/layout/PlansViewLayout.tsx
"use client";


import { ITravelPlan } from "@/types/travelPlan.interface";
import { useState } from "react";
import { PlanCard } from "./TravelPlanCard";

export const PlansViewLayout = ({ plans }: { plans: ITravelPlan[] }) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    status: "",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Filters */}
      {/* <PlanFilterBar filters={filters} setFilters={setFilters} /> */}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length ? (
          plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)
        ) : (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No travel plans available.
          </div>
        )}
      </div>
    </div>
  );
};
