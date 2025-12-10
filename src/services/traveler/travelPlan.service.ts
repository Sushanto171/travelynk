/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createPlanSchema } from "@/zod/travelPlan/travelPlan.validation";

export const createTravelPlan = catchAsyncAction(async (pre, formData: FormData) => {

  const entries = Array.from(formData.entries())
  const payload = entries.map(([key, value]) => ({ [key]: value })).reduce((accumulator, curr) => {
    return {
      ...accumulator, ...curr
    }
  }, {})

  const planData: any = { ...payload }

  planData.budget = Number(payload.budget)
  planData.longitude = Number(payload.longitude)
  planData.latitude = Number(payload.latitude)

  const validate = zodValidator(planData, createPlanSchema)


  if (!validate.success || !validate.data) {
    return validate
  }

  const res = await serverFetch.post("/plan", {
    body: JSON.stringify(validate.data),
    headers: { "Content-Type": "application/json" }
  })


  const result = await res.json()
  // console.log(result)

  if (!result?.success) {
    throw new Error(
      `Travel Plan creation failed: ${result?.message || "Unknown server error"}`
    );
  }

  return result
},)