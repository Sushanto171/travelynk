/* eslint-disable @typescript-eslint/no-explicit-any */
import { TripCard } from "./TripCard";

interface TripsListProps {
  trips: any[];
}

export function TripsList({ trips }: TripsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trips.map((t) => (
        <TripCard key={t.tripId} {...t} />
      ))}
    </div>
  );
}
