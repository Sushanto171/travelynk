"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { UserMatchCard } from "./UserMatchCard";

interface IMatchedUser {
  matchPercentage: number;
  id: string;
  name: string;
  email: string;
  profile_photo: string | null;
  current_location: string | null;
}

interface MatchedUsersSectionProps {
  matchedUsers: IMatchedUser[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
  })
};

/**
 * Section displaying top recommended matched travelers
 * Shows a grid of user match cards with a "View All" action
 */
export function MatchedUsersSection({ matchedUsers }: MatchedUsersSectionProps) {
  if (!matchedUsers || matchedUsers.length === 0) {
    return null;
  }

  return (
    <motion.section variants={fadeUp!} custom={5}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="text-primary" size={20} />
          <h2 className="text-xl font-bold tracking-tight">Top Recommendations</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedUsers.map((user) => (
          <UserMatchCard key={user.id} user={user} />
        ))}
      </div>
    </motion.section>
  );
}
