"use client";

import { UserCard } from "@/components/shared/UserCard";
import { timeAgo } from "@/lib/formatters";
import { Buddy } from "@/types/travelPlan.interface";
import { Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface PlanBuddiesProps {
  buddies: Buddy[];
}

export function PlanBuddies({ buddies }: PlanBuddiesProps) {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Participants ({buddies.length})
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {buddies.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No participants yet.
          </p>
        ) : (
          <div className="space-y-3">
            {buddies.map((b) => (
              <UserCard
                key={b.traveler.id}
                id={b.traveler.id}
                name={b.traveler.name}
                profile_photo={b.traveler.profile_photo}
                subText={`Accepted • ${timeAgo(b.updated_at)}`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
