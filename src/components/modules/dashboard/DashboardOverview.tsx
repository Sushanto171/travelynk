"use client";

import type { UserStats } from "@/types/userStats";
import { motion } from "framer-motion";
import { Compass, Users } from "lucide-react";
import { ActionsPanel } from "./components/ActionsPanel";
import { DashboardHeader } from "./components/DashboardHeader";
import { NotificationsFeed } from "./components/NotificationsFeed";
import { StatsGrid } from "./components/StatsGrid";
import { TripCard } from "./components/TripCard";
import { UserMatchCard } from "./components/UserMatchCard";

/**
 * Main Dashboard Overview Component
 * Enhanced with colorful gradients, icons, and smooth animations
 * 
 * @param stats - UserStats object containing all dashboard data
 */
export default function DashboardOverview({ stats }: { stats: UserStats }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground p-4 md:p-8 lg:p-12 font-sans selection:bg-primary/20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header Section with fade in */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardHeader
            userName={stats.name}
            pendingRequests={stats.pendingRequests}
            profileCompletion={60}
          />
        </motion.div>

        {/* Stats Grid with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <StatsGrid
            upcomingTrips={stats.upcomingTrips}
            totalMatches={stats.totalMatchedUsers ?? 0}
            pendingRequests={stats.pendingRequests}
            subscriptionTier={stats.subscriptionStatus}
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Matched Travelers & Trips */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Matched Travelers Section */}
            {stats.matchedUsers && stats.matchedUsers.length > 0 && (
              <section>
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Matched Travelers
                  </h2>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold"
                  >
                    {stats.matchedUsers.length}
                  </motion.div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.matchedUsers.map((user, idx) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    >
                      <UserMatchCard user={user} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Trips Section */}
            {stats.recentCreatePlans && stats.recentCreatePlans.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Compass className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Your Trips
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.recentCreatePlans.map((plan, idx) => (
                    <motion.div
                      key={plan.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + idx * 0.1 }}
                    >
                      <TripCard
                        destination={plan.title}
                        startDate={plan.start_date.toString()}
                        endDate={plan.end_date.toString()}
                        type={plan.tour_type}
                        budget={plan.budget}
                        interestedTravelers={plan.interestedTravelers}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>

          {/* Right Column: Notifications */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {stats.recentNotifications && stats.recentNotifications.length > 0 && (
              <NotificationsFeed notifications={stats.recentNotifications} />
            )}
          </motion.div>
        </div>

        {/* Bottom Actions with fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <ActionsPanel />
        </motion.div>
      </motion.div>
    </div>
  );
}
