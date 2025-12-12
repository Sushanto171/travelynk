export interface IReview {
  id: string
  reviewer_id: string
  plan_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
  plan: Plan
  reviewer: Reviewer
}

export interface Plan {
  slug: string
  title: string
}

export interface Reviewer {
  id: string
  name: string
  profile_photo: string
  email?:string
}
