"use server"
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createReviewSchema } from "@/zod/review/review.validation";

export const createReview = catchAsyncAction(async (prevState, formData: FormData) => {
  const rating = Number(formData.get("rating"))
  const plan_id = formData.get("plan_id")
  const comment = formData.get("comment")

  const payload = {
    rating,
    comment
  }

  const validate = zodValidator(payload, createReviewSchema)

  if (!validate.success || !validate.data) {
    return validate
  }

  const res = await serverFetch.post(`/review/${plan_id}`, {
    body: JSON.stringify(validate.data),
    headers: { "Content-Type": "application/json" }
  })

  const result = await res.json()
  return result
})
