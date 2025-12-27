"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { DestinationCard } from "./DestinationCard";

interface Destination {
  id: string;
  city: string;
  country: string;
  travelers: number;
  image?: string;
}

interface PopularDestinationsSectionProps {
  destinations?: Destination[];
}

const DEFAULT_DESTINATIONS: Destination[] = [
  { id: "paris", city: "Paris", country: "France", travelers: 98, image: "/images/paris.png" },
  { id: "kyoto", city: "Kyoto", country: "Japan", travelers: 124, image: "/images/tokyo.png" },
  { id: "bali", city: "Bali", country: "Indonesia", travelers: 76, image: "/images/bali.png" },
  { id: "nyc", city: "NYC", country: "USA", travelers: 63, image: "/images/nyc.png" },
];

export function PopularDestinationsSection({ destinations }: PopularDestinationsSectionProps) {
  const displayDestinations = destinations && destinations.length > 0
    ? destinations
    : DEFAULT_DESTINATIONS;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
          >
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Explore Destinations</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3 pb-2">
            Trending Now
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most popular destinations where travelers are connecting
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
