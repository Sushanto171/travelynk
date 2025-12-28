"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LucideIcon,
  PlusCircle,
  Search,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";

interface ActionItem {
  label: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
}

/**
 * Colorful animated action buttons with proper Next.js navigation
 */
export function ActionsPanel() {
  const actions: ActionItem[] = [
    {
      label: "Create Trip",
      icon: PlusCircle,
      gradient: "from-blue-500 to-cyan-500",
      href: "/dashboard/my-travel-plans",
    },
    {
      label: "Explore Travelers",
      icon: Search,
      gradient: "from-emerald-500 to-green-500",
      href: "/explore",
    },
    {
      label: "Edit Profile",
      icon: User,
      gradient: "from-purple-500 to-pink-500",
      href: `/my-profile`,
    },
    {
      label: "Upgrade Plan",
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-500",
      href: "/subscriptions",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            variant="outline"
            className="w-full h-14 gap-3 bg-card/50 border-border/50 backdrop-blur-xl hover:border-primary/50 transition-all relative overflow-hidden group"
          >
            <Link href={action.href}>
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="relative z-10 flex items-center gap-3"
                whileHover={{ x: 2 }}
              >
                <motion.div
                  className={`p-1.5 rounded-lg bg-gradient-to-br ${action.gradient} text-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <action.icon className="w-5 h-5" />
                </motion.div>

                <span className="font-medium">{action.label}</span>
              </motion.div>

              {/* Sparkle */}
              <motion.div
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <Zap className="w-3 h-3 text-primary" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
