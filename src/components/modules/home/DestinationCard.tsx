"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  id: string;
  city: string;
  country: string;
  travelers: number;
  image?: string;
  index?: number;
}

/**
 * Animated destination card with gradient overlay
 */
export function DestinationCard({
  id,
  city,
  country,
  travelers,
  image,
  index = 0
}: DestinationCardProps) {
  const gradients = [
    "from-blue-500/70 to-cyan-500/70",
    "from-emerald-500/70 to-green-500/70",
    "from-purple-500/70 to-pink-500/70",
    "from-amber-500/70 to-orange-500/70"
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/travel-plans?searchTerm=${city.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <Card className="p-0 h-64 relative group overflow-hidden rounded-2xl border-none shadow-xl">
          <div className="relative h-full w-full">
            {image ? (
              <Image
                src={image}
                alt={`${city}, ${country}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient.replace('/70', '')}`} />
            )}

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${gradient} via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-xs text-white/80 uppercase tracking-wider font-semibold">
                    {country}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {city}
                </h3>
                <div className="flex items-center gap-2 text-white/90">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {travelers}+ travelers here
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
