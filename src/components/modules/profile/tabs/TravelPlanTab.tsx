"use client";
import EmptyMassage from '@/components/shared/EmptyMassage';
import { PlansViewLayout } from '../../travel-plan/TravelPlansViewLayout';

import { ITravelPlan } from "@/types/travelPlan.interface";

export default function TravelPlanTab({ plans }: { plans: ITravelPlan[] }) {


  if (!plans.length) return (
  <EmptyMassage text=" No Travel Plans Created Yet" />
  )

  return <PlansViewLayout plans={plans} />;
}
