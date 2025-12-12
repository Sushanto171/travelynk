
import { ArrowRight } from "lucide-react";
import React from "react";

// --- Mock Data ---
const DESTINATIONS = [
  { id: "paris", city: "Paris", country: "France", color: "#1e40af" },
  { id: "tokyo", city: "Tokyo", country: "Japan", color: "#65a30d" },
  { id: "bali", city: "Bali", country: "Indonesia", color: "#c026d3" },
  { id: "newyork", city: "NYC", country: "USA", color: "#9d174d" },
];

// --- PlaceholderImage Component ---
const PlaceholderImage = ({
  text,
  bgColor,
  width = "100%",
  height = "12rem",
}: {
  text: string;
  bgColor: string;
  width?: string | number;
  height?: string | number;
}) => (
  <div
    className="flex items-center justify-center"
    style={{
      width,
      height,
      backgroundColor: bgColor,
      color: "#ffffff",
      fontSize: 72,
      fontWeight: 600,
      borderRadius: 16,
      textAlign: "center",
      paddingBottom: 30
    }}
  >
    {text}
  </div>
);

export function PopularDestinationsSection() {
  return (
    <section id="destinations" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>

          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            See all
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {DESTINATIONS.map((d) => (
            <div
              key={d.id}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Placeholder Image */}
              <PlaceholderImage text={d.city} bgColor={d.color} />

              {/* Gradient Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-semibold text-white">{d.city}</h3>
                <p className="text-sm text-indigo-200">{d.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
