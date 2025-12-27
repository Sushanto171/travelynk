"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TravelerProfileCard } from "./TravelerProfileCard";

interface Traveler {
  id: string;
  name: string;
  rating: number;
  current_location: string;
  profile_photo?: string | null;
}

interface TopTravelersSectionProps {
  travelers?: Traveler[];
}

const DEFAULT_TRAVELERS: Traveler[] = [
  { id: "1", name: "Imelda Meyers", rating: 4.8, current_location: "Barcelona" },
  { id: "2", name: "Anamika Sharma", rating: 4.9, current_location: "Dubai" },
  { id: "3", name: "Sushanto Kumar", rating: 4.7, current_location: "Paris" },
  { id: "4", name: "Emma Wilson", rating: 4.8, current_location: "Tokyo" },
  { id: "5", name: "James Chen", rating: 4.9, current_location: "London" },
  { id: "6", name: "Sofia Rodriguez", rating: 4.6, current_location: "Sydney" },
];

export function TopTravelersSection({ travelers }: TopTravelersSectionProps) {
  const data = travelers?.length ? travelers : DEFAULT_TRAVELERS;
  const totalSlides = data.length;

  const [activeIndex, setActiveIndex] = useState(Math.floor(totalSlides / 2));
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  // Circular offset
  const circularOffset = (index: number) => {
    const raw = index - activeIndex;
    if (raw > totalSlides / 2) return raw - totalSlides;
    if (raw < -totalSlides / 2) return raw + totalSlides;
    return raw;
  };

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Users2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Our Community
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
              Top-rated <span className="text-primary">travelers</span>
            </h2>

            <p className="mt-2 text-base sm:text-lg text-muted-foreground">
              Meet verified travelers with excellent reviews
            </p>
          </div>

          <Link href="/explore">
            <Button variant="ghost" className="text-primary group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Coverflow */}
        <section
          className="relative h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data.map((traveler, index) => {
            const offset = circularOffset(index);
            const isActive = offset === 0;

            // Responsive spacing
            const x =
              offset *
              (typeof window !== "undefined" && window.innerWidth < 640
                ? 120
                : window.innerWidth < 1024
                ? 180
                : 240);

            const z = isActive ? 60 : -120;
            const rotateY = isActive ? 0 : offset < 0 ? 30 : -30;

            // Scale rules
            let scaleX = 1;
            let scaleY = 1;

            if (isActive) {
              scaleX = 1.05;
              scaleY = 1.1;
            } else if (Math.abs(offset) === 1) {
              scaleX = 0.9;
              scaleY = 1.05;
            } else {
              scaleX = 0.8;
              scaleY = 0.9;
            }

            const opacity =
              Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25;

            return (
              <motion.div
                key={traveler.id}
                className="absolute"
                style={{
                  zIndex: 50 - Math.abs(offset),
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x,
                  rotateY,
                  z,
                  scaleX,
                  scaleY,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 22,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`
                    w-[140px] 
                    sm:w-[220px]
                    md:w-[320px]
                    lg:w-[380px]
                    rounded-2xl overflow-hidden cursor-pointer
                    ${isActive ? "bg-primary shadow-xl" : "bg-card border shadow-xl"}
                  `}
                >
                  <TravelerProfileCard
                    traveler={traveler}
                    index={index}
                    isStacked
                  />
                </div>
              </motion.div>
            );
          })}
        </section>
      </div>
    </section>
  );
}
