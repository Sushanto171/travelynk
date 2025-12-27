"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Crown, Plane, Zap } from "lucide-react";
import { PricingCard } from "./PricingCard";

export const PricingLayout = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="mb-4">
            <Plane className="w-3 h-3 mr-1" />
            Pricing Plans
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Adventure Plan
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing designed to match your travel style. Start free, upgrade anytime.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <PricingCard
              title="Explorer"
              price="0"
              billing="/forever"
              features={[
                "Create up to 3 travel plans",
                "Connect with travelers",
                "Basic profile features",
                "Community access",
                "Email support"
              ]}
              cta="Start Free"
              planType="FREE"
              icon={<Plane className="w-6 h-6" />}
            />
          </motion.div>

          {/* Monthly Plan - Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <PricingCard
              title="Adventurer"
              price="15"
              billing="/month"
              features={[
                "Unlimited travel plans",
                "Advanced matching algorithm",
                "Priority profile visibility",
                "Verified traveler badge",
                "Priority support",
                "Ad-free experience",
                "Travel analytics"
              ]}
              highlight
              cta="Get Started"
              planType="MONTHLY"
              icon={<Zap className="w-6 h-6" />}
              badge="Most Popular"
            />
          </motion.div>

          {/* Yearly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <PricingCard
              title="Globetrotter"
              price="144"
              billing="/year"
              originalPrice="180"
              features={[
                "Everything in Adventurer",
                "Save 20% annually",
                "Exclusive travel perks",
                "Early access to features",
                "Premium support 24/7",
                "Custom travel insights",
                "Partner discounts"
              ]}
              cta="Go Premium"
              planType="YEARLY"
              icon={<Crown className="w-6 h-6" />}
              badge="Best Value"
            />
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">All plans include</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              "Secure messaging",
              "Travel plan sharing",
              "Profile customization",
              "Mobile app access"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ or Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p>All plans come with a 14-day money-back guarantee. Cancel anytime.</p>
        </motion.div>
      </div>
    </section>
  );
};
