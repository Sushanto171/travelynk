"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    { id: 1, title: "Sign up & complete profile", icon: Users },
    { id: 2, title: "Create your travel plan", icon: MapPin },
    { id: 3, title: "Match & meetup", icon: Calendar },
  ];

  return (
    <section id="howItWork" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Fast, simple, and secure — designed for modern travelers who value trust
          and compatibility.
        </p>

        <div className="relative">
          {/* connector line (all devices) */}
          <motion.div
            className="absolute top-12 left-0 right-0 h-px bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <div className="grid grid-cols-3 gap-8 scale-90">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  {/* icon circle */}
                  <div className="relative h-24 w-24 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary hover:shadow-lg transition">
                    <Icon className="h-8 w-8 text-primary" />

                    {/* step badge */}
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full border border-border bg-background text-sm font-semibold flex items-center justify-center">
                      {step.id}
                    </span>
                  </div>

                  <p className="mt-6 text-base font-medium max-w-xs">
                    {step.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
