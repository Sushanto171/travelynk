"use server"

import catchAsync from "@/lib/catchAsync"
import { serverFetch } from "@/lib/server-fetch"

export const getCountry = catchAsync(async (params?: string) => {
  const res = await serverFetch.get("/country")
  return await res.json()
})