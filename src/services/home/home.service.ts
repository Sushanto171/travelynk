"use server"

import catchAsync from "@/lib/catchAsync"
import { serverFetch } from "@/lib/server-fetch"

/**
 * Fetch homepage statistics (total travelers, trips, ratings)
 */
export const getHomePageStats = catchAsync(async () => {
  const res = await serverFetch.get(`/stats/home`)
  const result = await res.json()
  return result?.data || {
    totalTravelers: 1200,
    totalTrips: 450,
    averageRating: 4.7,
    activeDestinations: 85
  }
})

/**
 * Fetch featured top-rated travelers for homepage
 */
export const getFeaturedTravelers = catchAsync(async (limit = 4) => {
  const res = await serverFetch.get(`/traveler?limit=${limit}`)
  const result = await res.json()
  return result?.data || []
})

/**
 * Fetch popular/trending destinations
 */
export const getPopularDestinations = catchAsync(async (limit = 4) => {
  const res = await serverFetch.get(`/destination?popular=true&limit=${limit}`)
  const result = await res.json()
  return result?.data || []
})

/**
 * Fetch featured travel plans for homepage
 */
export const getFeaturedTravelPlans = catchAsync(async (limit = 6) => {
  const res = await serverFetch.get(`/plan?status=PENDING&limit=${limit}&skip=4`)
  const result = await res.json()
  return result?.data || []
})

/**
 * Fetch recent testimonials/reviews
 */
export const getTestimonials = catchAsync(async (limit = 6) => {
  const res = await serverFetch.get(`/review?limit=${limit}&sort=-createdAt`)
  const result = await res.json()
  return result?.data || []
})
