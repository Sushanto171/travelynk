"use client";
import React, { useEffect, useState } from 'react';
import { PlansViewLayout } from '../../travel-plan/TravelPlansViewLayout';
import { getTravelPlans } from '@/services/travelPlan/travelPlan.service';
import { ITraveler } from '@/types/user.interface';

import { Card, CardContent } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Inbox } from "lucide-react";

export default function TravelPlanTab({ traveler }: { traveler: ITraveler }) {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPlans() {
      const data = await getTravelPlans(`owner_id=${traveler?.id}`);
      setPlans(data);
      setLoading(false);
    }
    fetchPlans();
  }, [traveler?.id]);

  if (loading) return <div>Loading plans...</div>;

  if(!plans.length) return (
            <Card className="py-16 border-dashed shadow-none text-center">
              <CardContent className="space-y-4">
                <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="text-2xl font-semibold text-gray-900">
                  No Travel Plans Created Yet
                </div>
              </CardContent>
            </Card>
  )

  return <PlansViewLayout plans={plans} />;
}
