"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, Clock, MessageCircle, UserPlus } from "lucide-react";

interface NotificationItem {
  message: string;
  timestamp: string;
}

interface NotificationsFeedProps {
  notifications: NotificationItem[];
}

const notificationIcons = [Bell, MessageCircle, UserPlus];

/**
 * Animated notifications feed with colorful icons
 */
export function NotificationsFeed({ notifications }: NotificationsFeedProps) {
  return (
    <div className="space-y-3">
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, i) => {
          const IconComponent = notificationIcons[i % notificationIcons.length];
          const colors = [
            "from-blue-500 to-cyan-500",
            "from-emerald-500 to-green-500",
            "from-purple-500 to-pink-500",
            "from-amber-500 to-orange-500"
          ];
          const gradientColor = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ x: 4, scale: 1.02 }}
            >
              <Card className="bg-card/50 border-border/50 backdrop-blur-xl overflow-hidden group relative">
                {/* Gradient side accent */}
                <motion.div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradientColor}`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                />

                <CardContent className="p-4 flex items-center gap-4">
                  <motion.div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientColor} text-white shadow-lg shrink-0`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <motion.p
                      className="text-sm leading-snug"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      {notification.message}
                    </motion.p>
                  </div>

                  <motion.div
                    className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{notification.timestamp}</span>
                  </motion.div>
                </CardContent>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </Card>
            </motion.div>
          );
        })
      ) : (
        <Card className="bg-card/50 border-border/50 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Bell className="w-12 h-12 text-muted-foreground/50" />
              </motion.div>
              <p className="text-sm text-muted-foreground text-center">
                No recent activity
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
