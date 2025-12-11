"use client";

export const PlanItinerary = ({ itinerary }: { itinerary: string }) => {
  return (
    <div className="border p-4 rounded-xl border-l-4  space-y-2">
      <h2 className="text-lg font-semibold">Itinerary</h2>
      <p className="text-sm text-muted-foreground whitespace-pre-line">{itinerary}</p>
    </div>
  );
};
