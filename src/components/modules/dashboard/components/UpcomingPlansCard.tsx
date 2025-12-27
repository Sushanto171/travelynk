"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface ITravelPlan {
  interestedTravelers: number;
  status: string;
  title: string;
  budget: number;
  start_date: Date | string;
  end_date: Date | string;
  tour_type: string;
  slug: string;
}

interface UpcomingPlansCardProps {
  plans: ITravelPlan[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
};

/**
 * Sidebar widget displaying upcoming travel itineraries
 * Shows plan title, start date, status, and link to full schedule
 */
export function UpcomingPlansCard({ plans }: UpcomingPlansCardProps) {
  return (
    <motion.section variants={fadeUp} custom={7}>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          <CardTitle>Upcoming Itineraries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {plans && plans.length > 0 ? (
            <>
              {plans.map((plan) => (
                <div key={plan.slug} className="group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">
                        {plan.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        {new Date(plan.start_date).toLocaleDateString()} — {plan.status}
                      </p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1" />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs h-8">
                View Schedule
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming trips
            </p>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
