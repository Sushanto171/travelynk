"use client";

import { ITravelPlan } from "@/types/travelPlan.interface";
import { useState } from "react";
import { PlanBuddies } from "./PlanBuddies";
import { PlanItinerary } from "./PlanItinerary";
import { PlanReviews } from "./PlanReview";

export const PlanTabs = ({ plan }: { plan: ITravelPlan }) => {
  const tabs = ["Itinerary", "Participants", "Reviews"];
  const [activeTab, setActiveTab] = useState("Itinerary");

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-sm font-medium ${activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4 space-y-4">
        {activeTab === "Itinerary" && <PlanItinerary itinerary={plan.itinerary} />}
        {activeTab === "Participants" && <PlanBuddies buddies={plan.buddies} />}
        {activeTab === "Reviews" && <PlanReviews reviews={plan.reviews} rating={plan.rating} />}
      </div>
    </div>
  );
};
