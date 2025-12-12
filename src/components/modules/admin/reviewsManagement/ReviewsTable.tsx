
"use client"

import { ManagementTable } from "@/components/shared/ManagementTable";
import { IReview } from "@/types/review.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { reviewsColumn } from "./reviewsColumn";

export default function ReviewsTable({ reviews }: { reviews: IReview[] }) {
  const [review, setReview] = useState<IReview | null>(null)
  const [deleteReviews, setDeleteReviews] = useState<IReview | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    // if (!deletereviews || !deletereviews.id) return
    // setIsDeleting(true)
    // const result = await deletereviewsById(deletereviews.id)
    // if (result.success) {
    //   toast.success(result.message || "review deleted successfully");
    //   handleRefresh();
    //   setDeletereview(null);
    // } else {
    //   toast.error(result.message || "Failed to delete");
    // }
    // setIsDeleting(false);
  }
  return (
    <div>
      {/* <TravelPlanCreateUpdateDialog
        open={!!review}
        review={review!}
        onClose={() => setReview(null)}
        onSuccess={handleRefresh}
      /> */}



      <ManagementTable
        data={reviews}
        columns={reviewsColumn}
        getRowKey={(row) => row.id!}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}