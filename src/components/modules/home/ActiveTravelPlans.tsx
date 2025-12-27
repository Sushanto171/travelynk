"use client";

import { Button } from "@/components/ui/button";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Plus } from "lucide-react";
import Link from "next/link";
import { LandingPlanCard } from "./LandingPlanCard";

interface ActiveTravelPlansProps {
  plans?: ITravelPlan[];
}

/**
 * Active Travel Plans Section - Shows dynamic travel plans
 * Uses colorful LandingPlanCard component
 */
export function ActiveTravelPlans({ plans }: ActiveTravelPlansProps) {
  const hasPlans = plans && plans.length > 0;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            >
              <Compass className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Upcoming Adventures
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-bold">
              Active travel <span className="text-primary">plans</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              {hasPlans
                ? "Join exciting trips planned by our community"
                : "Be the first to create an amazing travel plan"}
            </p>
          </div>

          <Link href="/travel-plans">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary font-medium flex items-center gap-2 group"
            >
              {hasPlans ? "View All Plans" : "Browse Plans"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Plans Grid or Empty State */}
        {hasPlans ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.slice(0, 6).map((plan, index) => (
              <LandingPlanCard
                key={plan.slug}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Compass className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Active Plans Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start planning your next adventure and connect with fellow travelers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dashboard/my-travel-plans">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Travel Plan
                  </Button>
                </Link>
                <Link href="/travel-plans">
                  <Button variant="outline">
                    Browse Destinations
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
