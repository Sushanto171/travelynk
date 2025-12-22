// "use client"
import { MapLayout } from "@/components/shared/MapLayout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { planStatusVariant } from "@/constant/planStatus"
import { formatTimeDate } from "@/lib/formatters"
import { ITravelPlan } from "@/types/travelPlan.interface"
import Link from "next/link"

interface Props {
  plan: ITravelPlan
}

export function PlanCard({ plan }: Props) {

  return (
    <Link href={`/travel-plans/${plan.slug}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md pt-0">
        {/* Map */}
        <MapLayout
          markers={[{ lat: Number(plan.latitude), lng: Number(plan.longitude) }]}
        />

        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight line-clamp-1">
              {plan.title}
            </h3>

            <Badge variant="secondary">
              {plan.tour_type}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1">
            📍 {plan.destination}
          </p>

        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            📅 {formatTimeDate(plan.start_date, false)} → {formatTimeDate(plan.end_date, false)}
          </p>

          <div className="flex justify-between">
            <span>👥 {plan.total_joined} joined</span>
            <span>
              ⭐ {plan.rating?.average ?? "No reviews"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={plan.owner.profile_photo} />
              <AvatarFallback>
                {plan.owner.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Link href={`/profile/${plan.owner.id}`} className="text-sm font-medium">
              {plan.owner.name}
            </Link>
          </div>

          <Badge variant={planStatusVariant[plan.status]}>
            {plan.status}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
