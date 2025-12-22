"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteInterestById } from "@/services/admin/interestManagement";
import { IInterest } from "@/types/interest.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { interestColumns } from "./interestColumns";
import InterestFormDialog from "./InterestFormDialog";

export default function InterestTable({ interests }: { interests: IInterest[] }) {
  const [interest, setInterest] = useState<IInterest | null>(null)
  const [deleteInterest, setDeleteInterest] = useState<IInterest | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    if (!deleteInterest || !deleteInterest.id) return
    setIsDeleting(true)
    const result = await deleteInterestById(deleteInterest.id)
    if (result.success) {
      toast.success(result.message || "interest deleted successfully");
      handleRefresh();
      setDeleteInterest(null);
    } else {
      toast.error(result.message || "Failed to delete");
    }
    setIsDeleting(false);
  }
  return (
    <div>
      <InterestFormDialog
        open={!!interest}
        interest={interest!}
        onClose={() => setInterest(null)}
        onSuccess={handleRefresh}
      />

      <DeleteConfirmationDialog
        open={!!deleteInterest}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteInterest(null)}
        title="Delete interest"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deleteInterest?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
      />

      <ManagementTable
        data={interests}
        columns={interestColumns}
        getRowKey={(row) => row.id!}
        onDelete={setDeleteInterest}
        onEdit={setInterest}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}