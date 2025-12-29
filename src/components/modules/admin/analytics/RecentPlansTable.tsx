"use client";

import { motion } from "framer-motion";
import { Map, User, Calendar, Tag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IPlanStatus, IPlanType } from "@/types/travelPlan.interface";

export interface RecentPlan {
  id: string;
  title: string;
  status: IPlanStatus;
  tour_type: IPlanType;
  created_at: Date;
  owner: {
    id: string;
    name: string;
    email: string;
  }
}

export function RecentPlansTable({ plans }: { plans: RecentPlan[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Plans</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/40 transition"
          >
            {/* Left */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                <span className="font-medium">{plan.title}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {plan.owner.name}
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(plan.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">
                <Tag className="mr-1 h-3 w-3" />
                {plan.tour_type.toLowerCase()}
              </Badge>

              <StatusBadge status={plan.status} />
            </div>
          </motion.div>
        ))}

        {plans.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">
            No recent plans found
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------ */
/* STATUS BADGE */
/* ------------------------ */

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    COMPLETED: "bg-emerald-500/15 text-emerald-600",
    PENDING: "bg-amber-500/15 text-amber-600",
    CANCELLED: "bg-rose-500/15 text-rose-600",
  };

  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        statusStyles[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
};
