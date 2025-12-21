
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

// Replace with external data source as needed
const TRAVELERS = [
  { id: 1, name: "Ariana", interests: ["hiking", "food"], rating: 4.8, color: "#3b82f6", initials: "A" },
  { id: 2, name: "Mateo", interests: ["photography", "culture"], rating: 4.6, color: "#10b981", initials: "M" },
  { id: 3, name: "Sana", interests: ["beaches", "diving"], rating: 4.9, color: "#f97316", initials: "S" },
  { id: 4, name: "Leo", interests: ["roadtrips", "coffee"], rating: 4.7, color: "#8b5cf6", initials: "L" },
];

// --- PlaceholderAvatar Component ---
const PlaceholderAvatar = ({
  initials,
  bgColor,
  size = 80,
}: {
  initials: string;
  bgColor: string;
  size?: number;
}) => (
  <div
    className="flex items-center justify-center rounded-full text-white font-semibold"
    style={{
      width: size,
      height: size,
      backgroundColor: bgColor,
      fontSize: size / 2,
    }}
  >
    {initials}
  </div>
);

export function TopTravelersSection() {
  return (
    <section className="py-16 sm:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold ">Top-rated travelers</h2>
          <a className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center" href="#">
            Browse profiles <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        {/* Travelers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAVELERS.map((t) => (
            <Card key={t.id} className="p-6 text-center hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col items-center">
                {/* Placeholder Avatar */}
                <PlaceholderAvatar initials={t.initials} bgColor={t.color} size={80} />

                <h3 className="text-xl font-semibold  mb-1">{t.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{t.interests.join(" • ")}</p>

                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 flex items-center gap-1 mb-3">
                  <Star className="h-3 w-3 fill-current" />
                  {t.rating}
                </Badge>

                <Button variant="outline" size="sm" className="w-full">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
