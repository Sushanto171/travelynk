"use client";

import { ITravelPlan } from "@/types/travelPlan.interface";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlanBuddies } from "./PlanBuddies";
import { PlanItinerary } from "./PlanItinerary";
import { PlanReviews } from "./PlanReview";

export const PlanTabs = ({ plan }: { plan: ITravelPlan }) => {
  const joined = plan.buddies.filter(
    (b) => b.request_type === "ACCEPTED"
  );

  return (
    <Tabs defaultValue="itinerary" className="w-full space-y-4">
      <TabsList className="flex md:grid md:grid-cols-4 w-full overflow-x-auto md:overflow-x-visible min-w-56 md:min-w-0">
        <TabsTrigger className="cursor-pointer" value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="participants">Participants</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="itinerary">
        <PlanItinerary itinerary={plan.itinerary} />
      </TabsContent>

      <TabsContent value="participants">
        <PlanBuddies buddies={joined} />
      </TabsContent>

      <TabsContent value="reviews">
        <PlanReviews reviews={plan.reviews} rating={plan.rating} />
      </TabsContent>
    </Tabs>
  );
};
