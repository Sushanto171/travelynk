
import { ArrowRight, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-white py-12 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* ----------------------------- */}
        {/* Left Content */}
        {/* ----------------------------- */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Travel together. Create{" "}
            <span className="text-indigo-600">better memories.</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg">
            Find compatible travel companions, plan meetups, and turn solo trips
            into shared adventures — securely and confidently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/travel-plans">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                Find Buddy <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="#howItWork">
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
              >
                How It Works
              </Button></Link>
          </div>

          <div className="flex space-x-6 pt-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>Thousands of active travelers</span>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span>Average rating: 4.7</span>
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* Right Image Card */}
        {/* ----------------------------- */}
        {/* <div className="relative flex justify-center md:justify-end">
          <Card className="max-w-xs w-full overflow-hidden shadow-2xl scale-105 relative">
            <div className="h-64 w-full relative">
              <Image
                src=""
                alt="Traveler"
                fill
                className="object-cover"
                priority
              />
            </div>

            <CardContent className="absolute bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">Sana — Bali</p>
                  <p className="text-sm text-gray-600">Looking for diving buddies</p>
                </div>

                <Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Star className="h-3 w-3 fill-current" />
                  <span>4.9★</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
}
