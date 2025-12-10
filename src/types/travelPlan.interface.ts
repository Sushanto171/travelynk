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
  tour_type: IPlanType
  status: IPlanStatus
  created_at: string
  updated_at: string
  owner: Owner
}

export interface Owner {
  id: string
  name: string
  email: string
}



export enum IPlanStatus {
  PENDING= "PENDING",
  ONGOING= "ONGOING",
  COMPLETED= "COMPLETED",
  CANCELLED= "CANCELLED",
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
