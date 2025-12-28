"use server"

import { serverFetch } from "@/lib/server-fetch"

export const getHomePageStats = async () => {
  try {
    const res = await serverFetch.get(`/stats/home`)
    const result = await res.json()

    return (
      result?.data ?? {
        totalTravelers: 1200,
        totalTrips: 450,
        averageRating: 4.7,
        activeDestinations: 85,
      }
    )
  } catch (error) {
    console.error("[getHomePageStats]", error)

    return {
      totalTravelers: 1200,
      totalTrips: 450,
      averageRating: 4.7,
      activeDestinations: 85,
    }
  }
}


export const getFeaturedTravelers = async (limit = 4) => {
  try {
    const res = await serverFetch.get(`/traveler?limit=${limit}`)
    const result = await res.json()

    return result?.data ?? []
  } catch (error) {
    console.error("[getFeaturedTravelers]", error)
    return []
  }
}


export const getPopularDestinations = async (limit = 4) => {
  try {
    const res = await serverFetch.get(
      `/destination?popular=true&limit=${limit}`
    )
    const result = await res.json()

    return result?.data ?? []
  } catch (error) {
    console.error("[getPopularDestinations]", error)
    return []
  }
}


export const getFeaturedTravelPlans = async (limit = 6) => {
  try {
    const res = await serverFetch.get(
      `/plan?status=PENDING&limit=${limit}&skip=4`
    )
    const result = await res.json()

    return result?.data ?? []
  } catch (error) {
    console.error("[getFeaturedTravelPlans]", error)
    return []
  }
}


export const getTestimonials = async (limit = 6) => {
  try {
    const res = await serverFetch.get(
      `/review?limit=${limit}`
    )
    const result = await res.json()

    return result?.data ?? []
  } catch (error) {
    console.error("[getTestimonials]", error)
    return []
  }
}
