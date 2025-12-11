import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface MatchCardProps {
  travelerId: string;
  name: string;
  avatar: string;
  location: string;
  matchPercentage: number;
  commonInterests: string[];
  destination: string;
  travelDates: string;
}

export function MatchCard({
  name,
  avatar,
  location,
  matchPercentage,
  commonInterests,
  destination,
  travelDates,
}: MatchCardProps) {
  return (
    <Card className="w-64 flex flex-col space-y-2 p-4">
      <div className="flex items-center space-x-3">
        <Image src={avatar} alt={name} width={40} height={40} className="rounded-full" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Destination: {destination}</p>
        <p className="text-xs text-muted-foreground">{travelDates}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {commonInterests.map((i) => (
          <Badge key={i}>{i}</Badge>
        ))}
      </div>
      <div className="text-right font-bold">{matchPercentage}% Match</div>
    </Card>
  );
}
