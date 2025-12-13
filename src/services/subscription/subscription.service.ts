"use server"
import catchAsync from "@/lib/catchAsync";
import { serverFetch } from "@/lib/server-fetch";
import { SubscriptionPlan } from "@/types/subscription.interface";
import { redirect } from "next/navigation";

export const createSubscription = catchAsync(async (plan_type: SubscriptionPlan) => {
  const res = await serverFetch.post("/subscription", {
    body: JSON.stringify({ plan_type }),
    headers: { "Content-Type": "application/json" }
  })

  const result = await res.json()

  if (result.success) {
    return redirect(result?.data?.paymentUrl)
  }
  return result
})


export const getSubscriptions = catchAsync(async (query?: string) => {

  const res = await serverFetch.get(`/subscription${query ? `?${query}` : ""}`)
  const result = await res.json()
  return result 
})