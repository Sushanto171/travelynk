"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Globe } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICountry } from "@/types/country.interface";

interface TravelerCardProps {
  id: string;
  name: string;
  age?: string;
  location?: string;
  profile_photo?: string | null;
  interests?: string[];
  verified?: boolean;
  visited_countries?: ICountry[];
}

export function ModernTravelerCard({
  id,
  name,
  location = "Unknown",
  profile_photo,
  interests = [],
  verified = false,
  visited_countries = [],
}: TravelerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative group w-full sm:max-w-sm overflow-visible"
    >
      {/* 🔥 CORNER GLOW — OUTSIDE CARD */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-6 -left-6 h-28 w-28 bg-primary/30 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
        <span className="absolute -top-6 -right-6 h-28 w-28 bg-emerald-400/30 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
        <span className="absolute -bottom-6 -left-6 h-28 w-28 bg-indigo-400/30 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
        <span className="absolute -bottom-6 -right-6 h-28 w-28 bg-amber-400/30 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
      </div>

      {/* ✨ CARD BODY */}
      <div className="relative bg-card rounded-2xl border border-border/40 shadow-lg p-6 min-h-[240px] flex flex-col justify-between overflow-hidden">
        {/* subtle inner border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

        <Link href={`/profile/${id}`} className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                {profile_photo ? (
                  <AvatarImage src={profile_photo} alt={name} />
                ) : (
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>

              {verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-background rounded-full p-0.5 shadow" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.slice(0, 2).map((interest, idx) => (
                <Badge
                  key={idx}
                  className="bg-muted/30 text-foreground/90 px-3 py-1 rounded-full text-xs"
                >
                  #{interest}
                </Badge>
              ))}
            </div>
          )}

          {/* Visited Countries */}
          {visited_countries.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {visited_countries.slice(0, 2).map((country, idx) => (
                <Badge
                  key={idx}
                  className="flex items-center gap-1 bg-muted/20 text-foreground/80 px-2 py-1 rounded-full text-xs"
                >
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  {country.name}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full hover:bg-primary/10 transition-colors"
            >
              View Details
            </Button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
