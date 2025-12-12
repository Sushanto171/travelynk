import ReviewsTable from "@/components/modules/admin/reviewsManagement/ReviewsTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getReviews } from "@/services/review/review.service";
import { Suspense } from "react";

export default async function AdminReviewManagementPage() {
  const reviews = await getReviews()
  return (
    <main className="space-y-6">
      <Suspense fallback={null} >

        <ManagementPageHeader title="All Reviews"
          description="Manage all reviews " />

        <ReviewsTable reviews={reviews?.data ||[]} />
      </Suspense>
    </main>)
}