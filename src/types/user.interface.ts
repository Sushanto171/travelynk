export interface IUser {
  id: string
  email: string
  name: string,
  status: UserStatus
  role: UserRole
  is_verified: boolean
  created_at: string
  updated_at: string
  admin: Admin
  traveler: ITraveler
}

export interface Admin {
  id: string
  name: string
  email: string
  user_id: string
  profile_photo: string
  contact_number?: string
  is_deleted: boolean
  address?: string
  created_at: string
  updated_at: string
}


export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED"


export interface ITraveler {
  id: string
  name: string
  email: string
  profile_photo?: string
  bio: string
  contact_number?: string
  date_of_birth?: string
  address?: string
  current_location?: string
  has_verified_badge: boolean
  last_active_at: string
  subscription_active: boolean
  created_at: string
  updated_at: string
  is_deleted: boolean
}
