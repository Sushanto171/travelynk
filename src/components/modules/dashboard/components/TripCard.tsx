"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Compass, DollarSign, Users } from "lucide-react";

interface TripCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  type: string;
  budget: number;
  interestedTravelers: number;
}

/**
 * Colorful trip card with icons and animations
 */
export function TripCard({
  destination,
  startDate,
  endDate,
  type,
  budget,
  interestedTravelers
}: TripCardProps) {
  const typeColors: Record<string, string> = {
    SOLO: "from-purple-500/20 to-pink-500/20",
    GROUP: "from-blue-500/20 to-cyan-500/20",
    FAMILY: "from-green-500/20 to-emerald-500/20",
    FRIENDS: "from-amber-500/20 to-orange-500/20",
    COUPLES: "from-rose-500/20 to-red-500/20"
  };

  const gradient = typeColors[type] || "from-primary/20 to-primary/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`bg-gradient-to-br ${gradient} border-border/50 backdrop-blur-xl overflow-hidden group relative`}>
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <CardContent className="p-5 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                <Compass className="w-5 h-5 text-primary" />
                {destination}
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge variant="outline" className="border-primary/50 text-primary">
                {type}
              </Badge>
            </motion.div>
          </div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {new Date(startDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <motion.div
                className="flex items-center gap-2 text-sm"
                whileHover={{ x: 2 }}
              >
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${budget}
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {interestedTravelers} interested
                </span>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </Card>
    </motion.div>
  );
}
