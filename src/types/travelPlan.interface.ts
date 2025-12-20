export interface ITravelPlan {
  id: string
  owner_id: string
  title: string
  destination: string
  latitude: number
  longitude: number
  place_id: string
  map_url: string
  budget: string
  start_date: string
  end_date: string
  itinerary: string
  tag: string
  slug: string
  tour_type: string
  status: string
  created_at: string
  updated_at: string
  owner: Owner
  buddies: Buddy[]
  reviews: Review[]
  rating: Rating
  total_joined: number
  total_requested: number
}

export interface Owner {
  id: string
  name: string
  email: string
}

export interface Buddy {
  request_type: string
  created_at: string
  updated_at: string
  traveler: Traveler
}

export interface Traveler {
  id: string
  name: string
  email: string
  profile_photo: string
}

export interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  reviewer: Reviewer
}

export interface Reviewer {
  id: string
  name: string
  email: string
  profile_photo: string
}

export interface Rating {
  average: number
  total: number
}


export enum IPlanStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export enum IPlanType {
  SOLO = "SOLO",
  GROUP = "GROUP",
  FAMILY = "FAMILY",
  FRIENDS = "FRIENDS",
  COLLEAGUES = "COLLEAGUES",
  COUPLES = "COUPLES",
  PETS = "PETS",
  OTHER = "OTHER",
}



// // Mapping Status to Tailwind CSS colors
// const StatusColorMap: Record<PlanStatus, { text: string, color: string, ring: string }> = {
//   [PlanStatus.PENDING]: { text: "Pending", color: "bg-yellow-100 text-yellow-800", ring: "ring-yellow-400" },
//   [PlanStatus.ONGOING]: { text: "Ongoing", color: "bg-blue-100 text-blue-800", ring: "ring-blue-500" },
//   [PlanStatus.COMPLETED]: { text: "Completed", color: "bg-green-100 text-green-800", ring: "ring-green-500" },
//   [PlanStatus.CANCELLED]: { text: "Cancelled", color: "bg-red-100 text-red-800", ring: "ring-red-500" },
// };
