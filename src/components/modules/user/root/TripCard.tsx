import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TripCardProps {
  tripId: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelType: string;
  budget: string;
  interestedCount: number;
}

export function TripCard({ destination, startDate, endDate, travelType, budget, interestedCount }: TripCardProps) {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{destination}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>{startDate} - {endDate}</p>
        <p>Type: {travelType}</p>
        <p>Budget: {budget}</p>
        <p>Interested Travelers: {interestedCount}</p>
      </CardContent>
    </Card>
  );
}
