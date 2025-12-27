"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon, MessageCircle, Plane, Search, UserPlus } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your travel preferences, interests, and dream destinations.",
    icon: UserPlus,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Discover Matches",
    description: "Browse compatible travelers based on your interests, destinations, and travel style.",
    icon: Search,
    gradient: "from-emerald-500 to-green-500"
  },
  {
    number: "03",
    title: "Connect & Plan",
    description: "Chat with potential travel buddies and plan your adventure together securely.",
    icon: MessageCircle,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "04",
    title: "Travel Together",
    description: "Embark on your journey with newfound friends and create unforgettable memories.",
    icon: Plane,
    gradient: "from-amber-500 to-orange-500"
  }
];

export function HowItWorksSection() {
  return (
    <section id="howItWork" className="py-16 sm:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
          >
            <Plane className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Simple Process</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start your journey to finding the perfect travel companion in four easy steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-border/50">
                {/* Background gradient effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Number badge */}
                <motion.div
                  className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-lg relative z-10`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection line */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
