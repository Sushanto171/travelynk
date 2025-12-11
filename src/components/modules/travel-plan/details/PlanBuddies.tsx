"use client";

import { Buddy } from "@/types/travelPlan.interface";
import { Users } from "lucide-react";

export const PlanBuddies = ({ buddies }: { buddies: Buddy[] }) => {
  if (!buddies.length)
    return <p className="text-muted-foreground">No participants yet.</p>;

  return (
    <div className="border p-4 rounded-xl   space-y-2">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Users className="w-5 h-5" /> Participants ({buddies.length})
      </h2>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {buddies.map((b, idx) => (
          <li key={idx}>
            {b.traveler.name} ({b.request_type}) -{" "}
            {new Date(b.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
