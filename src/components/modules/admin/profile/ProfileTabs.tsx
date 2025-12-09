// components/profile/ProfileTabs.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileTabContent } from "./ProfileTabContent";

export function ProfileTabs({ defaultTab = "about" }: { defaultTab?: string }) {
  const [tab, setTab] = useState(defaultTab);

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="trust">Trust</TabsTrigger>
        <TabsTrigger value="plans">Travel Plans</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      {/* ABOUT */}
      <TabsContent value="about">
        <ProfileTabContent
          title="About"
          description="General user information, bio, interests, and personal details."
        >
          <div className="text-sm">
            Add custom about content here...
          </div>
        </ProfileTabContent>
      </TabsContent>

      {/* TRUST */}
      <TabsContent value="trust">
        <ProfileTabContent
          title="Trust & Verification"
          description="Identity verification, badges, connected socials."
        >
          <div className="text-sm">
            Trust elements go here...
          </div>
        </ProfileTabContent>
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
