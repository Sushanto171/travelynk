"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Globe, Plane, Star, Users } from "lucide-react";
import Link from "next/link";

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/callToActionBg.png')" }}
      />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/20" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/30 rounded-full filter blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-8"
          >
            <Plane className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">Start Your Adventure</span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Ready to Find Your{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Travel Companion?
            </span>
          </h2>

          {/* Description */}
          <p className="text-md sm:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers who have already found their perfect travel buddies.
            Your next adventure awaits!
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-2xl shadow-primary/50 hover:shadow-primary/70 hover:scale-105 transition-all group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/travel-plans">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all bg-transparent"
              >
                Browse Travel Plans
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/20"
          >
            <StatCard
              icon={<Users className="w-5 h-5 text-primary" />}
              value="1200+"
              label="Active Travelers"
            />
            <StatCard
              icon={<Globe className="w-5 h-5 text-emerald-400" />}
              value="450+"
              label="Trips Organized"
            />
            <StatCard
              icon={<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
              value="4.7★"
              label="Average Rating"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Compass className="w-32 h-32 text-white animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <Plane className="w-24 h-24 text-primary" />
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="mb-3 p-3 rounded-full bg-white/10">
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </motion.div>
  );
}
