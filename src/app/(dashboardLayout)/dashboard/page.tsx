"use client"
import { UserDashboardHeader } from "@/components/modules/user/root/DashboardHeader";
import { KpiCard } from "@/components/modules/user/root/KpiCard";
import { MatchCarousel } from "@/components/modules/user/root/MatchCarousel";
import { NotificationsList } from "@/components/modules/user/root/NotificationList";
import { QuickActionsGrid } from "@/components/modules/user/root/QuickAction";
import { TripsList } from "@/components/modules/user/root/TripList";

// mock data
const kpiData = [
  { title: "Upcoming Trips", value: 2 },
  { title: "Matched Travelers", value: 5 },
  { title: "Pending Requests", value: 1 },
  { title: "Subscription Status", value: "Pro" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <UserDashboardHeader userName="Sushanto" profileCompletion={60} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      <MatchCarousel matches={[
        { travelerId: "1", name: "Alex", avatar: "/avatar1.jpg", location: "Bangkok", matchPercentage: 85, commonInterests: ["Hiking", "Food"], destination: "Thailand", travelDates: "2025-12-20 - 2025-12-27" },
        { travelerId: "2", name: "Maya", avatar: "/avatar2.jpg", location: "Paris", matchPercentage: 75, commonInterests: ["Photography"], destination: "France", travelDates: "2025-12-22 - 2025-12-28" }
      ]} />

      <TripsList trips={[
        { tripId: "t1", destination: "Thailand", startDate: "2025-12-20", endDate: "2025-12-27", travelType: "Solo", budget: "$800", interestedCount: 3 },
        { tripId: "t2", destination: "Paris", startDate: "2025-12-22", endDate: "2025-12-28", travelType: "Friends", budget: "$1500", interestedCount: 2 },
      ]} />

      <NotificationsList notifications={[
        { type: "match", message: "Alex wants to join your trip to Thailand", timestamp: "2h ago" },
        { type: "request", message: "Your join request to Paris trip is accepted", timestamp: "1d ago" },
      ]} />

      <QuickActionsGrid actions={[
        { label: "Create Trip", icon: <i className="ri-add-line text-xl" />, onClick: () => { } },
        { label: "Explore Travelers", icon: <i className="ri-search-line text-xl" />, onClick: () => { } },
        { label: "Edit Profile", icon: <i className="ri-user-settings-line text-xl" />, onClick: () => { } },
        { label: "Upgrade Plan", icon: <i className="ri-wallet-line text-xl" />, onClick: () => { } },
      ]} />
    </div>
  )
}
