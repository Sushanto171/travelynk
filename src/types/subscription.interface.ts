/* eslint-disable @typescript-eslint/no-explicit-any */
export type SubscriptionPlan = 'WEEKLY' | 'MONTHLY' | 'YEARLY'



export interface ISubscription {
  id: string
  subscriber_id: string
  plan_type: SubscriptionPlan
  payment_status: string
  payment_method: any
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  payments: Payment[]
  subscriber: Subscriber
}

export interface Payment {
  id: string
  subscription_id: string
  transactionId: string
  amount: number
  status: string
  created_at: string
  updated_at: string
}

export interface Subscriber {
  name: string
  id: string
  email: string
  profile_photo: string
}
