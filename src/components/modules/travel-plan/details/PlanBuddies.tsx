"use client";

import { UserCard } from "@/components/shared/UserCard";
import { formatTimeDate } from "@/lib/formatters";
import { Buddy } from "@/types/travelPlan.interface";
import { Users } from "lucide-react";

export const PlanBuddies = ({ buddies }: { buddies: Buddy[] }) => {
  if (!buddies.length)
    return (
      <p className="text-sm text-muted-foreground italic">
        No participants yet.
      </p>
    );

  return (
    <div className="border p-4 rounded-xl space-y-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-500" /> Participants ({buddies.length})
      </h2>

      <ul className="space-y-3">
        {buddies.map((b) => (
          <UserCard
            key={b.traveler.id}
            id={b.traveler.id}
            name={b.traveler.name}
            profile_photo={b.traveler.profile_photo}
            subText={`${b.request_type} • ${formatTimeDate(b.created_at,false)}`}
          />
        ))}

      </ul>
    </div>
  );
};
