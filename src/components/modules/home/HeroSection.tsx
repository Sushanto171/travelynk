import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-16 sm:py-24 md:pt-6">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-300/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-300/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Travel together. Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 animate-gradient-x">
              better memories.
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg">
            Find compatible travel companions, plan meetups, and turn solo trips
            into shared adventures — securely and confidently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/travel-plans">
              <Button
                size="lg"
                className="shadow-lg shadow-indigo-400/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Find Buddy <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="#howItWork">
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform duration-300"
              >
                How It Works
              </Button>
            </Link>
          </div>

          <div className="flex space-x-8 pt-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>Thousands of active travelers</span>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span>Average rating: 4.7</span>
            </div>
          </div>
        </div>

        {/* Right Image / Card */}
        <div className="relative flex justify-center md:justify-end">
          <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl/60 transition-shadow duration-500 transform hover:scale-105 relative h-72">
            {/* Hero Image */}
            <Image
              src="/heroImage.jpg" // replace with your selected image
              alt="Travelers enjoying adventure"
              fill
              className="object-cover w-full h-full rounded-2xl"
              priority
            />

            {/* Optional overlay badge or glow */}
            <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-2 shadow-md">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">4.9★ Sana — Bali</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
