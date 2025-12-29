"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string; // optional custom color for the icon
  bgColor?: string; // optional background color for the card
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-primary/80",
  bgColor = "bg-red-400",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-xl shadow-lg overflow-hidden  ${bgColor}`}
    >
      <Card className={`${bgColor}`}>
        <CardContent className="flex items-center  justify-between p-6 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-2xl font-bold">
                  <CountUp end={value} duration={1.5} separator="," />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-full ${color} bg-gradient-to-br from-primary/20 to-primary/50`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
