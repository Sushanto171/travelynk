"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { motion } from 'framer-motion';

// --- Mock Testimonials ---
const TESTIMONIALS = [
  { id: 1, name: "Maya R.", quote: "Found a travel buddy for Bali — best trip of my life.", color: "#ef4444", initials: "M" },
  { id: 2, name: "Omar K.", quote: "Verified badge boosted my matches by 3x.", color: "#3b82f6", initials: "O" },
  { id: 3, name: "Lina P.", quote: "Easy to use and very secure — highly recommended.", color: "#10b981", initials: "L" },
  { id: 4, name: "Sam T.", quote: "User-friendly, secure, and perfect for solo travelers.", color: "#f59e0b", initials: "S" },
];

// --- PlaceholderAvatar Component ---
const PlaceholderAvatar = ({ initials, bgColor, size = 50 }: { initials: string; bgColor: string; size?: number }) => (
  <div
    className="flex items-center justify-center rounded-full text-white font-semibold shadow-md"
    style={{ width: size, height: size, fontSize: size / 2, backgroundColor: bgColor }}
  >
    {initials}
  </div>
);

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  text-center">
     {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            >
              <Star className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
    Traveler Stories
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-bold">
 What <span className=" text-primary">Our Travelers Say</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
             
    Real stories from verified travelers who connected, explored, and experienced adventures across the globe.
            </p>
          </div>
        </motion.div>
        <Carousel className="w-full px-12 sm:px-24">
          <CarouselContent className="-ml-2 sm:gap-6 py-12 px-10 ">
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="shadow-xl border border-border/30  backdrop-blur-lg hover:scale-105 transition-transform duration-300 relative">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <PlaceholderAvatar initials={t.initials} bgColor={t.color} size={50} />
                      <h4 className="mt-4 font-semibold text-lg">{t.name}</h4>
                      <p className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <Star className="w-4 h-4 fill-green-500" /> Verified traveler
                      </p>
                      <p className="mt-3 italic  text-sm sm:text-base">&ldquo;{t.quote}&rdquo;</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
