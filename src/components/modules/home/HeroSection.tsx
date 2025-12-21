import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 md:pt-6">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-secondary/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
            Travel together. Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-x">
              better memories.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg">
            Find compatible travel companions, plan meetups, and turn solo trips
            into shared adventures — securely and confidently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/travel-plans">
              <Button
                size="lg"
                className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              >
                Find Buddy <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="#howItWork">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-transform duration-300"
              >
                How It Works
              </Button>
            </Link>
          </div>

          <div className="flex space-x-8 pt-8 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>1000+ of active travelers</span>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>Average rating: 4.7</span>
            </div>
          </div>
        </div>

        {/* Right Image / Card */}
        <div className="relative flex justify-center md:justify-end">
          <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl/60 transition-shadow duration-500 transform hover:scale-105 relative h-72">
            <Image
              src="/heroImage.jpg"
              alt="Travelers enjoying adventure"
              fill
              className="object-cover w-full h-full rounded-2xl"
              priority
            />

            <div className="absolute bottom-4 left-4 bg-background/70 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-2 shadow-md">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                4.9★ Sana — Bali
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
