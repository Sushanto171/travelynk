/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { planJoinRequest } from "@/services/travelPlan/travelPlan.service";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const PlanJoinButton = ({
  traveler_id,
  slug,
  planId,
  alreadyRequested,
}: {
  traveler_id?: string; // undefined = not logged in
  slug: string;         // <-- use slug for redirect
  planId: string;       // <-- still needed for API call
  alreadyRequested: boolean;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleJoin = () => {
    // 1. User not authenticated → send to login with redirectTo=<slug>
    if (!traveler_id) {
      router.push(`/login?redirectTo=/travel-plans/${slug}`);
      return;
    }

    if (alreadyRequested) return;
    // 2. Authenticated — submit join request
    startTransition(async () => {
      try {

        const result = await planJoinRequest(planId)
        toast.success(result.message)
      } catch (err: any) {
        toast.error(err.message)
        console.error(err);
      }
      router.refresh()
    });
  };

  return (
    <Button
      disabled={isPending || alreadyRequested}
      onClick={handleJoin}
      className="w-full md:w-auto"
    >
      {alreadyRequested ? "Request Sent" : "Join Trip"}
    </Button>
  );
};
