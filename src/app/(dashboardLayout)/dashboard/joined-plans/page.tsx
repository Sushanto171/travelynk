import { JoinedPlanCard } from "@/components/modules/traveler/JoinedPlanCard";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getJoinedPlans } from "@/services/travelPlan/travelPlan.service";
import { IJoinedPlan } from "@/types/joinedPlan.interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inbox } from "lucide-react";

export default async function JoinedPlansPage() {
  const data = (await getJoinedPlans()) as IJoinedPlan[];

  const isEmpty = !data || data.length === 0;

  return (
    <div className="space-y-6">
      <ManagementPageHeader title="Joined Plans" />

      {isEmpty ? (
        <Card className="py-16 border-dashed shadow-none text-center">
          <CardContent className="space-y-4">
            <Inbox className="mx-auto h-10 w-10 text-muted-foreground" />
            <div className="text-lg font-medium">No Joined Plans Yet</div>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              You haven&lsquo;t joined any travel plans. Explore available plans and request to join.
            </p>

            <Link href="/travel-plans">
              <Button className="mt-2">Find Travel Plans</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <JoinedPlanCard key={item.plan_id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
