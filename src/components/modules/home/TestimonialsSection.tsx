
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

// --- Mock Data ---
const TESTIMONIALS = [
  { id: 1, name: "Maya R.", quote: "Found a travel buddy for Bali — best trip of my life.", color: "#ef4444", initials: "M" },
  { id: 2, name: "Omar K.", quote: "Verified badge boosted my matches by 3x.", color: "#3b82f6", initials: "O" },
  { id: 3, name: "Lina P.", quote: "Easy to use and very secure — highly recommended.", color: "#10b981", initials: "L" },
];

// --- PlaceholderAvatar Component ---
const PlaceholderAvatar = ({
  initials,
  bgColor,
  size = 40,
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

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold  mb-12">
          Traveler stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              className="p-6 text-left shadow-xl border-gray-100  transform rotate-1 transition-transform duration-500 hover:rotate-0"
            >
              <div className="flex items-center space-x-3 mb-4">
                <PlaceholderAvatar initials={t.initials} bgColor={t.color} size={40} />

                <div>
                  <h4 className="font-semibold ">{t.name}</h4>
                  <p className="text-xs text-green-600 font-medium flex items-center">
                    <Star className="h-3 w-3 fill-green-500 mr-1" />
                    Verified traveler
                  </p>
                </div>
              </div>

              <p className="italic text-lg text-gray-700">&ldquo;{t.quote}&ldquo;</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
