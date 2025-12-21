
import { ArrowRight, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PLANS = [
  { id: "plan1", dest: "Lisbon, Portugal", dates: "Jun 10 - Jun 16", type: "Solo", buddies: 2, host: "Mateo" },
  { id: "plan2", dest: "Kyoto, Japan", dates: "Apr 04 - Apr 12", type: "Friends", buddies: 3, host: "Sana" },
  { id: "plan3", dest: "Phuket, Thailand", dates: "Dec 01 - Dec 08", type: "Family", buddies: 1, host: "Ariana" },
];

export function FeaturedPlansSection() {
  return (
    <section id="plans" className=" py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold ">Active travel plans</h2>
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
            View all plans <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col justify-between">
              <div className="space-y-3">

                <div className="flex items-center space-x-2 text-sm text-indigo-600 font-semibold">
                  <MapPin className="h-4 w-4" />
                  <span>{p.dest}</span>
                </div>

                <h3 className="text-xl font-bold ">
                  {p.dates} • {p.type} Trip
                </h3>

                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Looking for {p.buddies} buddies</span>

                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    Open to new buddies
                  </Badge>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <p className="text-sm ">
                  Hosted by{" "}
                  <span className="font-semibold text-gray-800">{p.host}</span>
                </p>

                <Button size="sm">
                  Request
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
