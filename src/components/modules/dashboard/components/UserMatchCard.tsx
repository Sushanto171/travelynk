"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";

interface IMatchedUser {
  matchPercentage: number;
  id: string;
  name: string;
  email: string;
  profile_photo: string | null;
  current_location: string | null;
}

interface UserMatchCardProps {
  user: IMatchedUser;
  destination?: string;
  startDate?: string;
  endDate?: string;
  interests?: string[];
}

/**
 * Colorful animated match card with icons and gradient effects
 */
export function UserMatchCard({
  user,
  destination = "Bangkok",
  startDate = "2025-12-20",
  endDate = "2025-12-27",
  interests = ["Hiking", "Food"]
}: UserMatchCardProps) {
  const matchColor = user.matchPercentage >= 75
    ? "from-emerald-500 to-green-600"
    : user.matchPercentage >= 50
      ? "from-blue-500 to-cyan-600"
      : "from-amber-500 to-orange-600";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="bg-gradient-to-br from-card/80 via-card/50 to-card/80 border-border/50 backdrop-blur-xl h-full overflow-hidden group relative">
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <CardContent className="p-5 relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-tr ${matchColor} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg ring-2 ring-background`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring" }}
            >
              {user.name[0]}
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.p
                className="font-semibold text-base"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {user.name}
              </motion.p>
              <motion.p
                className="text-xs text-muted-foreground flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <MapPin className="w-3 h-3 text-primary" />
                {user.current_location ?? destination}
              </motion.p>
            </div>
          </div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-3 rounded-lg border border-primary/20">
              <p className="text-sm font-medium flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                Destination: <span className="text-primary">{destination}</span>
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {new Date(startDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gradient-to-r from-primary/20 to-emerald-500/20 text-primary border-0 shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {interest}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-end pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className={`text-lg font-bold bg-gradient-to-r ${matchColor} bg-clip-text text-transparent`}
                whileHover={{ scale: 1.1 }}
              >
                {user.matchPercentage}% Match
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
