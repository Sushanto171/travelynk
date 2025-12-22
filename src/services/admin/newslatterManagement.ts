import catchAsync from "@/lib/catchAsync"
import { serverFetch } from "@/lib/server-fetch"

export const subscribeForNewslatter = catchAsync(async (payload: { email: string }) => {
  const res = await serverFetch.post(`/newslatter`, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })
  const result = await res.json()

    if (!result?.success) {
    throw new Error(
      `Newslatter subscription failed: ${result?.message || "Unknown server error"}`
    )
  }

  return result
})

export const getNewslatterEmails = catchAsync(async (params?: string) => {
  const res = await serverFetch.get(`/newslatter?${params ? `?searchTerm=${params}` : ""}`)
  const result = await res.json()
  return result
})