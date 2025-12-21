"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CallToActionSection() {
  return (
    <section
      className="relative py-20 sm:py-28 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/callToActionBg.png')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            mx-auto max-w-4xl rounded-3xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-2xl
            px-6 sm:px-10 py-12 sm:py-16
          "
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ready to find your travel buddy?
          </h2>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join Travelynk and access premium matches, priority placement, and trusted travelers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white"
            >
              See Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
