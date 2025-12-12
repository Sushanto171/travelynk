import { Card, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { id: 1, title: "Sign up & complete profile", icon: <Users className="h-8 w-8 text-indigo-600" /> },
    { id: 2, title: "Create your travel plan", icon: <MapPin className="h-8 w-8 text-indigo-600" /> },
    { id: 3, title: "Match & meetup", icon: <Calendar className="h-8 w-8 text-indigo-600" /> },
  ];

  return (
    <section id="howItWork"  className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Fast, simple, and secure — designed for modern travelers who value trust and compatibility.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <Card
              key={s.id}
              className="text-left p-6 shadow-lg border-indigo-100 hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 mb-4">
                {s.icon}
              </div>

              <p className="text-4xl font-extrabold text-indigo-600 mb-2">
                0{s.id}
              </p>

              <CardTitle className="text-xl">
                {s.title}
              </CardTitle>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
