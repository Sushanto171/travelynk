/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { updateRequestStatus } from "@/services/traveler/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const PlanRequestManager = ({
  buddies,
  planId,
}: {
  buddies: ITravelPlan["buddies"];
  planId: string;
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const pending = buddies.filter((b) => b.request_type === "REQUESTED");

  if (pending.length === 0)
    return (
      <div className="p-4 rounded-xl bg-muted/30">
        <p className="text-sm text-muted-foreground">No pending requests.</p>
      </div>
    );

  const handleAction = async (travelerId: string, status: "ACCEPTED" | "REMOVE") => {
    startTransition(async () => {
      try {

        const result = await updateRequestStatus({
          plan_id: planId,
          traveler_id: travelerId,
          request_status: status
        })
        toast.success(result.message)
      } catch (err: any) {
        toast.error(err.message)
        console.error(err);
      }
      router.refresh()
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold text-lg">Join Requests</h3>

      {pending.map((b) => (
        <div
          key={b.traveler.id}
          className="flex items-center justify-between border-b pb-3"
        >
          <div>
            <p className="font-medium">{b.traveler.name}</p>
            <p className="text-sm text-muted-foreground">{b.traveler.email}</p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleAction(b.traveler.id, "ACCEPTED")}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleAction(b.traveler.id, "REMOVE")}
            >
              Decline
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
