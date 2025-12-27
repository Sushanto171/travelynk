"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, User, Star } from "lucide-react";

interface Traveler {
  id?: string;
  name: string;
  rating: number;
  current_location: string;
  profile_photo?: string | null;
}

interface TravelerProfileCardProps {
  traveler: Traveler;
  index?: number;
  isStacked?: boolean;
}

export function TravelerProfileCard({
  traveler,
  index = 0,
  isStacked = false,
}: TravelerProfileCardProps) {
  const { name, rating, current_location, profile_photo } = traveler;

  const avatarColors = [
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-amber-500 to-orange-500",
    "bg-gradient-to-br from-red-500 to-rose-500",
    "bg-gradient-to-br from-indigo-500 to-purple-500",
    "bg-gradient-to-br from-teal-500 to-green-500",
  ];

  const avatarBg = avatarColors[index % avatarColors.length];

  /* ================= STACKED (COVERFLOW) ================= */
  if (isStacked) {
    return (
      <div className="relative w-full h-full flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl shadow-2xl">
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/10 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-8 pb-4">
          {/* Avatar with enhanced glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative mb-4 sm:mb-5"
          >
            {/* Multi-layer glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-2xl scale-125 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-110" />

            <Avatar className="relative h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-2xl ring-2 ring-primary/20">
              <AvatarImage src={profile_photo || undefined} alt={name} className="object-cover" />
              <AvatarFallback className={`${avatarBg} text-white text-2xl sm:text-3xl font-bold`}>
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Star badge with gradient */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="absolute -bottom-1 -right-1 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full p-2 shadow-lg ring-2 ring-background"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            </motion.div>
          </motion.div>

          {/* Name with gradient text */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl font-bold text-center leading-tight bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text mb-2"
          >
            {name}
          </motion.h3>

          {/* Location with icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-3 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-sm"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="line-clamp-1 font-medium">{current_location || "N/A"}</span>
          </motion.div>

          {/* Rating badge with gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 backdrop-blur-sm shadow-lg"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
            <span className="font-bold text-sm sm:text-base text-foreground">{rating}</span>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">/ 5.0</span>
          </motion.div>
        </div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative p-4 sm:p-5 border-t border-border/50 bg-gradient-to-b from-muted/30 to-muted/50 backdrop-blur-sm"
        >
          <Button
            size="sm"
            className="w-full gap-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
          >
            <User className="w-3.5 h-3.5" />
            View Profile
          </Button>
        </motion.div>

        {/* Decorative elements with proper color tokens */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-6 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    );
  }

  /* ================= COMPACT CARD ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative flex flex-col items-center w-full rounded-xl border border-border/50 bg-card p-4 sm:p-5 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar with enhanced styling */}
      <div className="relative mb-3">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Avatar className="relative h-16 w-16 sm:h-20 sm:w-20 border-3 border-background shadow-lg ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300">
          <AvatarImage src={profile_photo || undefined} alt={name} className="object-cover" />
          <AvatarFallback className={`${avatarBg} text-white text-xl sm:text-2xl font-bold`}>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Mini star indicator */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full p-1 shadow-md ring-2 ring-background">
          <Star className="w-2.5 h-2.5 fill-current" />
        </div>
      </div>

      {/* Name */}
      <p className="relative text-sm sm:text-base font-bold text-center line-clamp-1 mb-1.5 bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text">
        {name}
      </p>

      {/* Location */}
      <div className="relative flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-3 px-2.5 py-1 rounded-full bg-muted/50">
        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
        <span className="line-clamp-1 font-medium">{current_location || "N/A"}</span>
      </div>

      {/* Rating badge */}
      <Badge className="relative flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 shadow-sm hover:shadow-md transition-shadow duration-300 px-3 py-1">
        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500 text-yellow-500" />
        <span>{rating}</span>
        <span className="text-muted-foreground text-[10px] sm:text-xs">/ 5</span>
      </Badge>

      {/* Decorative corner accents */}
      <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-10 h-10 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
