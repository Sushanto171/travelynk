"use client";

import { Badge } from "@/components/ui/badge";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { MapPin, Users, CalendarDays, Star } from "lucide-react";

export const PlanHeader = ({ plan }: { plan: ITravelPlan }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{plan.title}</h1>
        <Badge>{plan.tour_type}</Badge>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {plan.destination}
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          {plan.start_date} → {plan.end_date}
        </div>

        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {plan.total_joined} joined
        </div>

        {plan.rating.total > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {plan.rating.average.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
};
