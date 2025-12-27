"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, Crown, LucideIcon, Plane, TrendingUp, Users } from "lucide-react";

interface StatsGridProps {
  upcomingTrips: number;
  totalMatches: number;
  pendingRequests: number;
  subscriptionTier: string;
}

interface KPIItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

/**
 * Colorful animated stats grid with icons and gradients
 */
export function StatsGrid({
  upcomingTrips,
  totalMatches,
  pendingRequests,
  subscriptionTier
}: StatsGridProps) {
  const kpis: KPIItem[] = [
    {
      label: "Upcoming Trips",
      value: upcomingTrips,
      icon: Plane,
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500"
    },
    {
      label: "Matched Travelers",
      value: totalMatches,
      icon: Users,
      gradient: "from-emerald-500/10 to-green-500/10",
      iconColor: "text-emerald-500"
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      icon: Clock,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-500"
    },
    {
      label: "Subscription Status",
      value: subscriptionTier,
      icon: Crown,
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className={`bg-gradient-to-br ${kpi.gradient} border-border/50 backdrop-blur overflow-hidden group relative`}>
            <CardContent className="pt-6 pb-6 relative z-10">
              <div className="flex items-start justify-between mb-3">
                <motion.div
                  className={`p-2.5 rounded-xl bg-background/50 ${kpi.iconColor} shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <kpi.icon className="w-5 h-5" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </div>
              <div className="space-y-1">
                <motion.div
                  className="text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {kpi.value}
                </motion.div>
                <div className="text-xs font-medium text-muted-foreground">{kpi.label}</div>
              </div>
            </CardContent>

            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  "linear-gradient(135deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)",
                  "linear-gradient(225deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)",
                  "linear-gradient(135deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
