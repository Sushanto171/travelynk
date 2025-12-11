/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ITravelPlan, IPlanStatus } from "@/types/travelPlan.interface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TravelPlanCreateUpdateDialog from "../TravelPlanFormDialog";
import { toast } from "sonner"; // optional for feedback
import { updateTravelPlanStatus } from "@/services/traveler/travelPlan.service";
import { useRouter } from "next/navigation";

export const PlanOwnerActions = ({ plan }: { plan: ITravelPlan }) => {
  const [selectedStatus, setSelectedStatus] = useState<IPlanStatus>(plan.status as IPlanStatus);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleStatusUpdate = () => {
    startTransition(async () => {
      try {
         await updateTravelPlanStatus(plan.id, selectedStatus)
        toast.success(`Plan status updated to ${selectedStatus}`);
        router.refresh()
      } catch (err:any) {
        // console.error(err);
        toast.error(err.message);
      }
    });
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold text-lg">Manage Travel Plan</h3>

      <div className="flex flex-col gap-2">
        {/* Edit Plan */}
        <TravelPlanCreateUpdateDialog plan={plan} />

        {/* Status Update */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Update Status</label>
          <Select
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as IPlanStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(IPlanStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="default"
            className="w-full mt-2"
            onClick={handleStatusUpdate}
            disabled={isPending || selectedStatus === plan.status}
          >
            Update Status
          </Button>
        </div>
      </div>
    </div>
  );
};
