/* eslint-disable @typescript-eslint/no-explicit-any */
import { MatchCard } from "./MatchCard";

interface MatchCarouselProps {
  matches: any[];
}

export function MatchCarousel({ matches }: MatchCarouselProps) {
  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {matches.map((m) => (
        <MatchCard key={m.travelerId} {...m} />
      ))}
    </div>
  );
}
