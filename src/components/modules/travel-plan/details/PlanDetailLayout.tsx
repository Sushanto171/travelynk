"use client"

import { ITravelPlan } from "@/types/travelPlan.interface"
import { PlanHeader } from "./PlanHeader"
import { PlanJoinButton } from "./PlanJoinButton"
import { PlanOwnerActions } from "./PlanOwnerAction"
import { PlanRequestManager } from "./PlanRequestManager"
import { PlanTabs } from "./PlanTabs"
import { MapLayout } from "@/components/shared/MapLayout"
import { Card, CardContent } from "@/components/ui/card"

export const PlanDetailsLayout = ({
  plan,
  currentUserId,
}: {
  plan: ITravelPlan
  currentUserId: string
}) => {
  const isOwner = currentUserId === plan.owner.id
  const hasRequested = plan.buddies.some(
    (b) => b.traveler.id === currentUserId
  )

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* ===== PLAN HEADING ===== */}
      <PlanHeader plan={plan} />

      {/* ===== CONTENT + SIDE PANEL ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background border rounded-xl p-4 md:p-6">
            <PlanTabs plan={plan} />
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
          {/* VIEWER ACTION */}
          {!isOwner && plan.status === "PENDING" && (
            <PlanJoinButton
              slug={plan.slug}
              traveler_id={currentUserId}
              planId={plan.id}
              alreadyRequested={hasRequested}
            />
          )}

          {/* OWNER MANAGEMENT */}
          {isOwner ? (
            <>
              <PlanOwnerActions plan={plan} />
              <PlanRequestManager
                total_requested={plan.total_requested}
                buddies={plan.buddies}
                planId={plan.id}
              />
            </>
          ) : (
            /* VIEWER MAP (SIDE) */
            <Card className="overflow-hidden pt-0">
              <MapLayout
                markers={[
                  {
                    lat: plan.latitude,
                    lng: plan.longitude,
                    title: plan.destination,
                  },
                ]}
                zoom={10}
                height="h-56"
              />
              <CardContent className="pt-3">
                <p className="text-sm font-medium">{plan.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  📍 {plan.destination}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* ===== OWNER MAP (BOTTOM FULL WIDTH) ===== */}
      {isOwner && (
        <Card className="overflow-hidden pt-0">
          <MapLayout
            markers={[
              {
                lat: plan.latitude,
                lng: plan.longitude,
                title: plan.destination,
              },
            ]}
            height="h-64"
          />
          <CardContent className="pt-3">
            <p className="text-sm font-medium">{plan.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              📍 {plan.destination}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
