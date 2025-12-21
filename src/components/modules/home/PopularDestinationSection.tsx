import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DESTINATIONS = [
  { id: "paris", city: "Paris", country: "France", travelers: 98 },
  { id: "tokyo", city: "Kyoto", country: "Japan", travelers: 124 },
  { id: "bali", city: "Bali", country: "Indonesia", travelers: 76 },
  { id: "nyc", city: "NYC", country: "USA", travelers: 63 },
];

export function PopularDestinationsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {DESTINATIONS.map((d) => (
            <Link key={d.id} href={`/travel-plans?searchTerm=${d.id}`}>
              <Card className="p-0 h-fit relative group overflow-hidden rounded-2xl border-none shadow-lg">
                <div className="relative h-78 w-full">
                  <Image
                    src={`/images/${d.id}.png`}
                    alt={`${d.city}, ${d.country}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay INSIDE image */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {d.city}, {d.country}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
                      <Users className="h-4 w-4" />
                      {d.travelers} travelers there
                    </p>
                  </div>
                </div>
              </Card>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
