"use client";

import { UserCard } from "@/components/shared/UserCard";
import { timeAgo } from "@/lib/formatters";
import { Buddy } from "@/types/travelPlan.interface";
import { Users } from "lucide-react";

interface PlanBuddiesProps {
  buddies: Buddy[];
}

export const PlanBuddies = ({ buddies }: PlanBuddiesProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-500" />
        Participants ({buddies.length})
      </h2>

      {/* Empty State */}
      {buddies.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          No participants yet.
        </p>
      ) : (
        <div className="border p-4 rounded-xl space-y-3 bg-white shadow-sm">
          {buddies.map((b) => (
            <UserCard
              key={b.traveler.id}
              id={b.traveler.id}
              name={b.traveler.name}
              profile_photo={b.traveler.profile_photo}
              subText={`${b.request_type} • ${timeAgo(
                b.updated_at)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
