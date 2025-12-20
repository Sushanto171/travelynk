"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { travelPlansColumn } from "./travelPlansColumn";
import TravelPlanCreateUpdateDialog from "../../travel-plan/TravelPlanFormDialog";
import { toast } from "sonner";
import { deleteTravelPlanById } from "@/services/travelPlan/travelPlan.service";

export default function TravelPlansTable({ travelPlans }: { travelPlans: ITravelPlan[] }) {
  const [plan, setPlan] = useState<ITravelPlan | null>(null)
  const [deleteTravelPlan, setDeleteTravelPlan] = useState<ITravelPlan | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  const handleView = (travelPlan: ITravelPlan) => {
    router.push(`/travel-plans/${travelPlan.slug}`)
  }

  const handleConfirm = async () => {
    if (!deleteTravelPlan || !deleteTravelPlan.id) return
    setIsDeleting(true)
    const result = await deleteTravelPlanById(deleteTravelPlan.id)
    if (result.success) {
      toast.success(result.message || "plan deleted successfully");
      handleRefresh();
      setDeleteTravelPlan(null);
    } else {
      toast.error(result.message || "Failed to delete");
    }
    setIsDeleting(false);
  }
  return (
    <div>
      <TravelPlanCreateUpdateDialog
      showButton={false}
        plan={plan!}
        onClose={() => setPlan(null)}
        onSuccess={handleRefresh}
      />

      <DeleteConfirmationDialog
        open={!!deleteTravelPlan}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteTravelPlan(null)}
        title="Delete plan"
        description={`Are you sure you want to delete ${deleteTravelPlan?.title}? This action cannot be undone.`}
      />

      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumn}
        getRowKey={(row) => row.id!}
        onDelete={setDeleteTravelPlan}
        onEdit={setPlan}
        onView={handleView}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}