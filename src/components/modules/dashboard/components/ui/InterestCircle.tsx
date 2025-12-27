"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface InterestCircleProps {
  interests: string[];
}

/**
 * Visual representation of common interests in a radial layout
 * Displays interests as animated circles around a center point
 */
export function InterestCircle({ interests = [] }: InterestCircleProps) {
  if (!interests || interests.length === 0) {
    return (
      <div className="flex items-center justify-center bg-accent/50 rounded-full w-full h-full p-2">
        <div className="text-xs text-muted-foreground">No common interests</div>
      </div>
    );
  }

  const radius = 40;
  const center = 60;
  const angleStep = (2 * Math.PI) / interests.length;

  return (
    <div className="flex items-center justify-center bg-accent/50 rounded-full w-full h-full p-2">
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <circle
          cx={center}
          cy={center}
          r={radius + 5}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/10"
          strokeDasharray="4 4"
        />
        {interests.map((interest, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <motion.g
              key={interest + i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              <circle cx={x} cy={y} r={16} className="fill-primary shadow-sm" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="7"
                fontWeight="600"
                fill="white"
                className="pointer-events-none uppercase tracking-tighter"
              >
                {interest.length > 5 ? interest.substring(0, 4) + ".." : interest}
              </text>
            </motion.g>
          );
        })}
        <circle cx={center} cy={center} r={10} className="fill-background stroke-primary stroke-2" />
        <TrendingUp className="text-primary" size={10} x={center - 5} y={center - 5} />
      </svg>
    </div>
  );
}
