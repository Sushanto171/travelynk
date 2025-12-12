
"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { travelPlansColumn } from "./travelPlansColumn";

export default function TravelPlansTable({ travelPlans }: { travelPlans: ITravelPlan[] }) {
  const [interest, setInterest] = useState<ITravelPlan | null>(null)
  const [deleteTravelPlans, setDeleteTravelPlans] = useState<ITravelPlan | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    // if (!deleteTravelPlans || !deleteTravelPlans.id) return
    // setIsDeleting(true)
    // const result = await deleteTravelPlansById(deleteTravelPlans.id)
    // if (result.success) {
    //   toast.success(result.message || "interest deleted successfully");
    //   handleRefresh();
    //   setDeleteInterest(null);
    // } else {
    //   toast.error(result.message || "Failed to delete");
    // }
    // setIsDeleting(false);
  }
  return (
    <div>
      {/* <TravelPlanCreateUpdateDialog
        open={!!interest}
        interest={interest!}
        onClose={() => setInterest(null)}
        onSuccess={handleRefresh}
      /> */}

      <DeleteConfirmationDialog
        open={!!deleteTravelPlans}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteTravelPlans(null)}
        title="Delete interest"
        description={`Are you sure you want to delete ${deleteTravelPlans?.title}? This action cannot be undone.`}
      />

      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumn}
        getRowKey={(row) => row.id!}
        onDelete={setDeleteTravelPlans}
        onEdit={setInterest}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}