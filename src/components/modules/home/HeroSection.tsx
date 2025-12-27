"use client";

import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ArrowRight, MapPin, Sparkles, Star, Users, Plane } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  stats?: {
    totalTravelers?: number;
    averageRating?: number;
    activeDestinations?: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const {
    totalTravelers = 1200,
    averageRating = 4.8,
    activeDestinations = 85,
  } = stats || {};

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
const words = headlineRef.current?.querySelectorAll(".word");

if (!words || words.length === 0) return;
if (!buttonsRef || !buttonsRef?.current?.children) return;

gsap.from(Array.from(words), {
  opacity: 0,
  y: 40,
  rotationX: -90,
  stagger: 0.08,
  duration: 0.9,
  ease: "back.out(1.6)",
});


      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        delay: 0.5,
        ease: "power2.out",
      });

      gsap.from(buttonsRef.current?.children, {
        opacity: 0,
        x: -32,
        stagger: 0.18,
        duration: 0.7,
        delay: 0.8,
        ease: "power3.out",
      });

      const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.from(stat, {
          textContent: 0,
          duration: 1.8,
          delay: 1,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          onUpdate() {
            const value = Math.ceil(
              Number((this.targets()[0] as HTMLElement).textContent || 0)
            );
            (this.targets()[0] as HTMLElement).textContent =
              value.toLocaleString();
          },
        });
      });

      floatingElementsRef.current
        ?.querySelectorAll(".floating-element")
        .forEach((el, i) => {
          gsap.to(el, {
            y: "random(-18, 18)",
            x: "random(-12, 12)",
            rotation: "random(-4, 4)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });

      gsap.to(".orb-1", {
        x: 28,
        y: -28,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orb-2", {
        x: -22,
        y: 22,
        scale: 0.9,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-20"
    >
      {/* Background orbs */}
      <div className="orb-1 absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="orb-2 absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />

      {/* Floating elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-32 left-20 w-16 h-16 bg-primary/10 rounded-xl border border-primary/20 backdrop-blur-sm" />
        <div className="floating-element absolute top-48 right-32 w-12 h-12 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-sm" />
        <div className="floating-element absolute bottom-40 left-40 w-20 h-20 bg-blue-500/10 rounded-lg border border-blue-500/20 backdrop-blur-sm" />
        <Plane className="floating-element absolute top-64 right-48 w-8 h-8 text-primary/70" />
        <MapPin className="floating-element absolute bottom-32 right-24 w-10 h-10 text-emerald-400/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1
            className="font-extrabold leading-[1.05]
            text-[clamp(2.75rem,5vw,5.5rem)]
            sm:text-[clamp(1.25rem,6vw,4.5rem)]"
          >
            <span className="word inline-block text-white mr-3">Travel</span>
            <span className="word inline-block text-white mr-3">together.</span>
            <br />
            <span className="word inline-block text-white mr-3">Create</span>
            <span className="word inline-block text-white mr-3">better</span>
            <br />
            <span className="word inline-block bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              with stories.
            </span>
          </h1>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl
          text-gray-300/90 leading-relaxed
          max-w-2xl mx-auto mb-12"
        >
          Connect with like-minded travelers, share experiences, and create
          unforgettable memories together. Start your journey today.
        </p>

        {/* CTA */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="px-8 py-5 text-base sm:text-lg
              bg-gradient-to-r from-primary to-emerald-500
              hover:from-primary/90 hover:to-emerald-500/90
              shadow-xl shadow-primary/40 hover:shadow-primary/60
              transition-all group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/travel-plans">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-5  bg-tranparent sm:text-lg
              border-white/30 text-white hover:bg-white/10"
            >
              Explore Plans
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <Stat icon={<Users className="w-7 h-7 text-primary" />} value={totalTravelers} label="Travelers" />
          <Stat icon={<Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />} value={Math.floor(averageRating * 10)} label="Rating" />
          <Stat icon={<MapPin className="w-7 h-7 text-emerald-400" />} value={activeDestinations} label="Destinations" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce ">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
      <div className="flex justify-center mb-2">{icon}</div>
      <div
        className="stat-number text-2xl sm:text-3xl font-semibold text-white mb-1"
        data-target={value}
      >
        0
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
