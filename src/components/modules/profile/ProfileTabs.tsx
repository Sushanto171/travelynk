
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITraveler, IUser, UserRole } from "@/types/user.interface";
import { useState } from "react";
import { ProfileTabContent } from "./ProfileTabContent";
import { AboutTab } from "./tabs/AboutTab";
import { TrustTab } from "./tabs/TrustTab";
import TravelPlanTab from "./tabs/TravelPlanTab";

export function ProfileTabs({ defaultTab = "about", user, traveler }: {
  defaultTab?: string
  user: IUser,
  traveler: ITraveler
}) {
  const [tab, setTab] = useState(defaultTab);

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full overflow-hidden">
      <TabsList className="flex md:grid md:grid-cols-4 w-full overflow-x-auto md:overflow-x-visible min-w-56 md:min-w-0">
        <TabsTrigger className="flex-1 md:flex-auto cursor-pointer text-center" value="about">
          About
        </TabsTrigger>

        {
user.role === UserRole.USER && (
<>
  <TabsTrigger className="flex-1 md:flex-auto cursor-pointer text-center" value="trust">
          Trust
        </TabsTrigger>
        <TabsTrigger className="flex-1 md:flex-auto cursor-pointer text-center" value="plans">
          Travel Plans
        </TabsTrigger>
        <TabsTrigger className="flex-1 md:flex-auto cursor-pointer text-center" value="reviews">
          Reviews
        </TabsTrigger>
</>
)
  
        }
      </TabsList>

      <TabsContent value="about">
        <AboutTab traveler={traveler} />
      </TabsContent>

      <TabsContent value="trust">
        <TrustTab user={user} traveler={traveler} />
      </TabsContent>


      {/* TRAVEL PLANS */}
      <TabsContent value="plans">
        <ProfileTabContent
          title="Travel Plans"
          description="Upcoming trips, destinations, and availability."
        >


          <div className="text-sm">
            Travel plan cards or schedule go here...
          </div>

          <TravelPlanTab />
        </ProfileTabContent>
      </TabsContent>

      {/* REVIEWS */}
      <TabsContent value="reviews">
        <ProfileTabContent
          title="User Reviews"
          description="Ratings and feedback from other users."
        >
          <div className="text-sm">
            Review list goes here...
          </div>
        </ProfileTabContent>
      </TabsContent>
    </Tabs>
  );
}
