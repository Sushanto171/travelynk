/* eslint-disable @typescript-eslint/no-explicit-any */

import { SubscriptionPlan } from "./subscription.interface";
import { IPlanStatus, IPlanType } from "./travelPlan.interface";


export interface UserStats {
  name: string,
  upcomingTrips: number,
  pendingRequests: number,
  recentCreatePlans: ITravelPlan[],
  subscriptionStatus: SubscriptionPlan | "FREE",
  recentNotifications?: any,
  // subscribe user matching only
  matchedUsers?: IMatchedUser[]
  totalMatchedUsers?: number
}


export interface ITravelPlan {
  interestedTravelers: number;
  status: IPlanStatus;
  title: string;
  budget: number;
  start_date: string;
  end_date: Date;
  tour_type: IPlanType;
  slug: string
}

export interface IMatchedUser {
  matchPercentage: number;
  id: string;
  name: string;
  email: string;
  profile_photo: string | null;
  current_location: string | null;
}