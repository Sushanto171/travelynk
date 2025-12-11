export interface IJoinedPlan {
  traveler_id: string
  plan_id: string
  request_type: string
  created_at: string
  updated_at: string
  plan: Plan
}

export interface Plan {
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
}

export interface Owner {
  id: string
  name: string
  email: string
  profile_photo: string
}
