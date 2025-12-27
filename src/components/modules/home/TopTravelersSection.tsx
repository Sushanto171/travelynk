"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight ,Annoyed} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { TravelerProfileCard } from "./TravelerProfileCard";
import { motion } from 'framer-motion';

interface Traveler {
  id: string;
  name: string;
  current_location?: string;
  rating?: number;
  profile_photo?: string | null;
}

interface TopTravelersSectionProps {
  travelers?: Traveler[];
}

const DEFAULT_TRAVELERS = [
  { id: "1", name: "Imelda Meyers", rating: 4.8, current_location: "Barcelona", profile_photo: null },
  { id: "2", name: "Anamika", rating: 4.9, current_location: "Dubai", profile_photo: null },
  { id: "3", name: "Sushanto kumar", rating: 4.7, current_location: "Paris", profile_photo: null },
  { id: "4", name: "Sushanto kumar", rating: 4.8, current_location: "Tokyo", profile_photo: null },
  { id: "5", name: "Sushanto kumar", rating: 4.9, current_location: "London", profile_photo: null },
  { id: "6", name: "Sushanto kumar", rating: 4.6, current_location: "Sydney", profile_photo: null },
];

export function TopTravelersSection({ travelers }: TopTravelersSectionProps) {
  const displayTravelers = travelers && travelers.length > 0 ? travelers : DEFAULT_TRAVELERS;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            >
              <Annoyed className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Our Community
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-bold">
              Top-rated <span className="text-primary">travelers</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
               Meet verified travelers with excellent reviews
            </p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hidden md:flex">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hidden md:flex">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {displayTravelers.map((traveler, index) => (
              <div key={traveler.id} className="flex-shrink-0">
                <TravelerProfileCard {...traveler} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
