"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  pendingRequests: number;
  profileCompletion?: number;
}

/**
 * Dashboard header with animated greeting and profile completion
 * Features sparkle icon and gradient text effects
 */
export function DashboardHeader({
  userName,
  pendingRequests,
  profileCompletion = 0
}: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Welcome back, {userName}
          </h1>
          <motion.span
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-3xl md:text-4xl origin-bottom-right"
          >
            👋
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-muted-foreground flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Complete your profile to get better match recommendations
        </motion.p>
      </motion.div>

      {profileCompletion > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        >
          <Badge
            variant="secondary"
            className="text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-primary/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-3 py-1"
          >
            {profileCompletion}% Completed
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
