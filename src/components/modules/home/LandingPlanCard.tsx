"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Plane,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Props {
  plan: ITravelPlan;
  index?: number;
}

export function LandingPlanCard({ plan, index = 0 }: Props) {
  const typeStyles: Record<
    string,
    { badge: string; icon: string; accent: string }
  > = {
    SOLO: {
      badge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      icon: "text-purple-500",
      accent: "bg-purple-500",
    },
    GROUP: {
      badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      icon: "text-blue-500",
      accent: "bg-blue-500",
    },
    FAMILY: {
      badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      icon: "text-emerald-500",
      accent: "bg-emerald-500",
    },
    FRIENDS: {
      badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      icon: "text-amber-500",
      accent: "bg-amber-500",
    },
    COUPLES: {
      badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      icon: "text-rose-500",
      accent: "bg-rose-500",
    },
  };

  const style = typeStyles[plan.tour_type] ?? typeStyles.GROUP;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <Link href={`/travel-plans/${plan.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -6 }}
        className="h-full"
      >
        <Card className="relative h-full flex flex-col  overflow-hidden bg-background border border-border hover:shadow-xl transition-shadow">
          {/* Accent strip */}
          <span
            className={`absolute top-0 left-0 h-1 w-full ${style.accent}`}
          />

          <CardContent className="p-4 space-y-4 flex-grow">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {plan.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className={`w-4 h-4 ${style.icon}`} />
                  {plan.destination}
                </div>
              </div>

              <Badge
                variant="outline"
                className={`${style.badge} shrink-0`}
              >
                <Plane className={`w-3 h-3 mr-1 ${style.icon}`} />
                {plan.tour_type}
              </Badge>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className={`w-4 h-4 ${style.icon}`} />
              {formatDate(plan.start_date)} – {formatDate(plan.end_date)}
            </div>

            {/* Stats */}
            <div className="flex justify-between pt-2">
              <Stat
                icon={<Users className="w-4 h-4" />}
                value={plan.total_joined}
                label="Joined"
              />
              <Stat
                icon={<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                value={
                  plan.rating?.average
                    ? plan.rating.average.toFixed(1)
                    : "New"
                }
                label="Rating"
              />
              <Stat
                icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
                value={plan.status}
                label="Status"
              />
            </div>
          </CardContent>

          <CardFooter className="p-4 border-t border-border flex justify-between">
            {/* Owner */}
                <Link href={`/profile/${plan.owner.id}`} >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={plan.owner.profile_photo ?? undefined} />
                <AvatarFallback>
                  {plan.owner.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{plan.owner.name}</p>
                <p className="text-xs text-muted-foreground">Trip Creator</p>
              </div>
            </div>
                </Link>

            <motion.span
              whileHover={{ x: 4 }}
              className={style.icon}
            >
              →
            </motion.span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}

/* -------------------------------- */

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-sm">
      {icon}
      <span className="font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
