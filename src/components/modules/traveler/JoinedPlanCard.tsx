"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { statusColor } from "@/constant/planStatus";
import { cancelJoinRequest } from "@/services/travelPlan/travelPlan.service";
import { IJoinedPlan } from "@/types/joinedPlan.interface";
import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import CreateReviewDialog from "../review/ReviewFormDialog";
// import { cancelJoinRequest } from "@/actions/plan/cancel-join-request";

interface JoinedPlanCardProps {
  item: IJoinedPlan;
}

export const JoinedPlanCard = ({ item }: JoinedPlanCardProps) => {
  const { plan, created_at, } = item;
  const router = useRouter()

  const isCompleted = plan.status === "COMPLETED";
  const isPendingRequest = plan.status === "PENDING";

  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelJoinRequest(plan.id);
      if (result.success) {
        toast.success(result.message);
        router.refresh()
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card className="rounded-2xl shadow-sm border">
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle className="text-lg font-semibold">{plan.title}</CardTitle>
        {/* Status Badge */}
        <Badge className={statusColor[plan.status]}>
          {plan.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Destination */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{plan.destination}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {format(new Date(plan.start_date), "MMM dd, yyyy")} →{" "}
            {format(new Date(plan.end_date), "MMM dd, yyyy")}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          {/* Requested Date */}
          <div className="text-xs text-muted-foreground">
            Requested on {format(new Date(created_at), "MMM dd, yyyy")}
          </div>

          <div className="flex items-center gap-2">
            {/* View Details */}
            <Link href={`/travel-plans/${plan.slug}`}>
              <Button size="sm" variant="secondary">
                View <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            {/* Review Button */}
            {isCompleted && (
              <CreateReviewDialog planId={plan.id} />
            )}

            {/* Cancel Button */}
            {isPendingRequest && (
              <Button
                size="sm"
                variant="destructive"
                disabled={isPending}
                onClick={handleCancel}
                className="gap-1"
              >
                <XCircle className="w-4 h-4" />
                {isPending ? "Canceling..." : "Cancel"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
