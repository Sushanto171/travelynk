"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ModernTravelerCard } from "./ModernTravelerCard";
import { ITraveler } from "@/types/user.interface";



interface ExplorePageProps {
  travelers: ITraveler[];
}

export function ExplorePageLayout({ travelers }: ExplorePageProps) {
  return (
    <section className="px-1 ">


      {/* Travelers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {travelers.map((traveler) => (
          <motion.div
            key={traveler.id}
            whileHover={{ y: -4, scale: 1.03 }}
            className="transition-all duration-200"
          >
            <ModernTravelerCard
            id={traveler.id}
              name={traveler.name}
              age={traveler.date_of_birth ?? "0"}
              location={traveler.address ?? "Unknown"}
              profile_photo={
                traveler.profile_photo 
              }
              interests={traveler.interests?.map((i) => i.name) || []}
              verified={traveler.subscription_active ?? false}
              visited_countries={traveler.visited_countries ||[]}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
