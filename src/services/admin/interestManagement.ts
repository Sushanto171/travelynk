"use server"
import catchAsync from "@/lib/catchAsync";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { IInterest } from "@/types/interest.interface";

export const getInterests = catchAsync(async () => {
  const res = await serverFetch.get("/interest")
  const result = await res.json()
  return result?.data || []
})

export const createMultipleInterests = catchAsyncAction(async (pre, formData: FormData) => {
  const interests: IInterest[] | null = []
  const entries = Array.from(formData.entries())

  entries.forEach(([, value]) => {
    if (!value) throw new Error("All name field are required.")
    interests.push({ name: value as string })
  })


  const res = await serverFetch.post("/interest", {
    body: JSON.stringify(interests),
    headers: { "Content-Type": "application/json" }
  });

  const result = await res.json();

  if (!result?.success) {
    throw new Error(
      `Bulk interest creation failed: ${result?.message || "Unknown server error"}`
    );
  }
  return result
})


export const updateInterest = catchAsyncAction(async (pre, formData: FormData) => {

  const id = formData.get("id")
  const name = formData.get("name")

  if (!name) throw new Error("Interest name is required.")

  const res = await serverFetch.patch(`/interest/${id}`, {
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" }
  });

  const result = await res.json();

  return result
})



export const deleteInterestById = catchAsync(async (id: string) => {
  const res = await serverFetch.delete(`/interest/${id}`,)
  const result = await res.json()

  if (!result?.success) {
    throw new Error(
      `Interest deletion failed: ${result?.message || "Unknown server error"}`
    )
  }

  return result
})
