/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTravelPlanStatus } from "@/services/travelPlan/travelPlan.service";
import { IPlanStatus, ITravelPlan } from "@/types/travelPlan.interface";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import TravelPlanCreateUpdateDialog from "../TravelPlanFormDialog";

export const PlanOwnerActions = ({ plan }: { plan: ITravelPlan }) => {
  const [selectedStatus, setSelectedStatus] = useState<IPlanStatus>(
    plan.status as IPlanStatus
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusUpdate = () => {
    startTransition(async () => {
      try {
        await updateTravelPlanStatus(plan.id, selectedStatus);
        toast.success(`Status updated to "${selectedStatus}"`);
        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Failed to update status");
      }
    });
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Manage Travel Plan</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Edit plan */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Edit plan details</p>
            <p className="text-sm text-muted-foreground">
              Update destination, dates, or description
            </p>
          </div>

          <TravelPlanCreateUpdateDialog plan={plan} />
        </div>

        <div className="border-t" />

        {/* Status update */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Plan status</p>
            <p className="text-sm text-muted-foreground">
              Control whether your plan is visible or active
            </p>
          </div>

          <Select
            value={selectedStatus}
            onValueChange={(value) =>
              setSelectedStatus(value as IPlanStatus)
            }
          >
            <SelectTrigger>
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
            className="w-full"
            onClick={handleStatusUpdate}
            disabled={isPending || selectedStatus === plan.status}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
