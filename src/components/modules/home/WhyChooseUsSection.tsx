"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, CheckCircle2, HeartHandshake, LucideIcon, Shield, Users } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All travelers are verified for your safety and peace of mind",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Smart Matching",
    description: "AI-powered algorithm finds your perfect travel companions",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    icon: Award,
    title: "Trusted Community",
    description: "Join thousands of verified travelers with excellent ratings",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: HeartHandshake,
    title: "Secure Messaging",
    description: "Chat safely with end-to-end encrypted conversations",
    gradient: "from-amber-500 to-orange-500"
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Why Choose Travelynk</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3">
            Travel with Confidence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide everything you need to find and connect with the perfect travel buddy
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 h-full text-center relative overflow-hidden group bg-gradient-to-br from-card/90 to-card/50 backdrop-blur border-border/50">
                {/* Background gradient glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-xl relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Animated border glow */}
                <motion.div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
