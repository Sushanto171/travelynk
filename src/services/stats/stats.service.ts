"use server"

import catchAsync from "@/lib/catchAsync"
import { serverFetch } from "@/lib/server-fetch"

export const getStats = catchAsync(async () => {
  const res = await serverFetch.get(`/stats`)
  const result = await res.json()
  return result?.data 
})