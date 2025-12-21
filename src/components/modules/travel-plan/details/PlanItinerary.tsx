"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DayItem = {
  day: string;
  date: string;
  title: string;
  desc: string;
};

export function PlanItinerary({ itinerary }: { itinerary: string }) {
  const parsed: DayItem[] = itinerary
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [day, date, title, desc] = line.split("|").map((x) => x.trim());
      return { day, date, title, desc };
    });

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Itinerary</CardTitle>
      </CardHeader>

      <CardContent className="pt-2 space-y-6 relative">
        {parsed.map((item, idx) => (
          <div key={idx} className="relative pl-6 space-y-1">

            {/* timeline dot */}
            <span
              className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary"
            />

            {/* line except last */}
            {idx !== parsed.length - 1 && (
              <span className="absolute left-[5px] top-6 h-[calc(100%+24px)] w-[2px] bg-muted" />
            )}

            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {item.day} • {item.date}
            </p>

            <p className="font-semibold">{item.title}</p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

        {/* <Separator className="mt-3" /> */}

        {/* <p className="text-xs text-right text-muted-foreground">
          + View full itinerary ({parsed.length} days)
        </p> */}
      </CardContent>
    </Card>
  );
}
