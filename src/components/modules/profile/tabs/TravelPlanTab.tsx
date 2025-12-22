"use client";
import EmptyMassage from '@/components/shared/EmptyMassage';
import { PlansViewLayout } from '../../travel-plan/TravelPlansViewLayout';

import { ITravelPlan } from "@/types/travelPlan.interface";

export default function TravelPlanTab({ plans, isOwner }: { plans: ITravelPlan[], isOwner: boolean }) {


  if (!plans.length) return (
    <EmptyMassage text=" No Travel Plans Created Yet" />
  )

  return (
    <>
      {/* <TravelPlanFilter /> */}
      <PlansViewLayout plans={plans} isTab={isOwner ? true : false} />
    </>
  )
}
