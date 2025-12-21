"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { statusColor } from "@/constant/planStatus";
import { formatTimeDate, timeAgo } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { CalendarDays, MapPin, Star, Users, Clock } from "lucide-react";
import { UserCard } from "@/components/shared/UserCard";

export const PlanHeader = ({ plan }: { plan: ITravelPlan }) => {
  return (
    <div className="space-y-4">
      {/* Title + Badges */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">{plan.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{plan.destination}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{plan.tour_type}</Badge>
          <Badge className={statusColor[plan.status]}>{plan.status}</Badge>
        </div>
      </div>

    {/* Host Section */}
      <UserCard
        id={plan.owner.id}
        name={plan.owner.name}
        // email={plan.owner.email}
        // subText={`Created ${timeAgo(plan.created_at)}`}
        linkToProfile
      />

      <Separator />

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        {/* Date Range */}
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>
            {formatTimeDate(plan.start_date, false)} → {formatTimeDate(plan.end_date, false)}
          </span>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{plan.total_joined} joined</span>
        </div>

        {/* Rating */}
        {plan.rating.total > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{plan.rating.average.toFixed(1)}</span>
          </div>
        )}

        {/* Created Time */}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Created {timeAgo(plan.created_at)}</span>
        </div>
      </div>

      <Separator />

  
    </div>
  );
};
