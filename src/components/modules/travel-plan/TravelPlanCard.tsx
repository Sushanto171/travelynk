// components/plan/cards/PlanCard.tsx
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { formatTimeDate } from "@/lib/formatters";

export const PlanCard = ({ plan }: { plan: ITravelPlan }) => {
  const rating =
    plan.reviews?.length > 0
      ? (
          plan.reviews.reduce((sum: number, r) => sum + r.rating, 0) /
          plan.reviews.length
        ).toFixed(1)
      : null;

  return (
    <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ">
      {/* Header */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-1">{plan.title}</h3>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{plan.destination}</span>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {plan.tour_type}
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          <span>
            {formatTimeDate(plan.start_date, false)} → {formatTimeDate(plan.end_date, false)}
          </span>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{plan.total_joined} joined</span>
          </div>

          {rating ? (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No reviews</span>
          )}
        </div>

        {/* Owner */}
        <div className="pt-3 border-t text-sm text-muted-foreground">
          Hosted by {" "}: {" "}  
          <Link href={`/profile/${plan.owner_id}`}>
          <span className="font-medium">{plan.owner.name}</span>
          </Link>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-2 flex justify-between">
        <Link
          href={`/travel-plans/${plan.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details
        </Link>

        <Badge variant={plan.status === "ONGOING" ? "default" : "outline"}>
          {plan.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
