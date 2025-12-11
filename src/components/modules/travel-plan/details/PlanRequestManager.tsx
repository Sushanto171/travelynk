/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserCard } from "@/components/shared/UserCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateRequestStatus } from "@/services/travelPlan/travelPlan.service";
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
      <Card className="p-6 rounded-xl">
        <p className="text-sm text-muted-foreground">
          No pending requests.
        </p>
      </Card>
    );

  const handleAction = async (
    travelerId: string,
    status: "ACCEPTED" | "REMOVE"
  ) => {
    startTransition(async () => {
      try {
        const result = await updateRequestStatus({
          plan_id: planId,
          traveler_id: travelerId,
          request_status: status,
        });

        toast.success(result.message);
      } catch (err: any) {
        toast.error(err.message);
      }
      router.refresh();
    });
  };

  return (
    <Card className="p-6 rounded-xl space-y-5 shadow-sm">
      <h3 className="font-semibold text-lg">Join Requests</h3>

      <div className="space-y-4">
        {pending.map((b) => (
          <div
            key={b.traveler.id}
            className="border rounded-xl p-4 flex flex-col gap-4 bg-muted/10"
          >
            {/* USER CARD */}
            <UserCard
              id={b.traveler.id}
              name={b.traveler.name}
              profile_photo={b.traveler.profile_photo}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
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
    </Card>
  );
};
