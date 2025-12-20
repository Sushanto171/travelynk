
"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { deleteReviewById } from "@/services/review/review.service";
import { IReview } from "@/types/review.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { reviewsColumn } from "./reviewsColumn";

export default function ReviewsTable({ reviews }: { reviews: IReview[] }) {
  const [deleteReview, setDeleteReview] = useState<IReview | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    if (!deleteReview || !deleteReview.id) return
    setIsDeleting(true)
    const result = await deleteReviewById(deleteReview.id)
    if (result.success) {
      toast.success(result.message || "review deleted successfully");
      handleRefresh();
      setDeleteReview(null);
    } else {
      toast.error(result.message || "Failed to delete");
    }
    setIsDeleting(false);
  }
  return (
    <div>

      <DeleteConfirmationDialog
        open={!!deleteReview}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteReview(null)}
        title="Delete Review"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deleteReview?.comment}
            </span>
            ? This action cannot be undone.
          </>
        }
      />


      <ManagementTable
        data={reviews}
        columns={reviewsColumn}
        onDelete={setDeleteReview}
        getRowKey={(row) => row.id!}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}