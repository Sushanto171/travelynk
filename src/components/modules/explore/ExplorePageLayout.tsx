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
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Explore <span className="text-primary">Travelers</span>
        </h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          Connect with travelers who share your interests
        </p>
      </div>

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

      {/* Pagination / Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {travelers.map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-full bg-muted-foreground/40"
          />
        ))}
      </div>
    </section>
  );
}
