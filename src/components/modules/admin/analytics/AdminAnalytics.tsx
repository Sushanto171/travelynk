"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SubscriptionPlan } from "@/types/subscription.interface";
import { IPlanStatus, IPlanType } from "@/types/travelPlan.interface";
import { motion } from "framer-motion";
import {
  Activity,
  CreditCard,
  DollarSign,
  Map,
  Users,
} from "lucide-react";
import { AnalyticsPie } from "./AnalyticsPie";
import { RecentPlansTable } from "./RecentPlansTable";
import { RecentUsersTable } from "./RecentUsersTable";
import { StatCard } from "./StatCard";

export interface AdminStats {
  totalUsers: number;
  totalPlans: number;
  totalSubscriptions: number;
  recentUsers: IAdminUser[];
  recentPlans: IAdminPlan[];
  last7DaysNewUsers: number;
  last7DaysNewPlans: number;
  last30DaysNewUsers: number;
  last30DaysNewPlans: number;
  last7DaysSubscriptions: number;
  last30DaysSubscriptions: number;
  last7daysRevenue: number;
  last30daysRevenue: number;
  totalRevenue: number;
  planPieChartData: { status: IPlanStatus; count: number }[];
  subscriptionPieChartData: { plan: SubscriptionPlan | "FREE"; count: number }[];
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  profile_photo: string | null;
  created_at: Date;
}

export interface IAdminPlan {
  id: string;
  title: string;
  status: IPlanStatus;
  tour_type: IPlanType;
  created_at: Date;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminAnalytics({ stats }: { stats: AdminStats }) {
  // Transform pie chart data for AnalyticsPie component
  const formattedPlanData = stats.planPieChartData.map((item, index) => ({
    browser: item.status,
    visitors: item.count,
    fill: `var(--chart-${index + 1})`,
  }));

  const formattedSubscriptionData = stats.subscriptionPieChartData.map(
    (item, index) => ({
      browser: item.plan,
      visitors: item.count,
      fill: `var(--chart-${index + 1})`,
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Platform performance & financial insights
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          color="text-yellow-500"
          bgColor="bg-yellow-100/20"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="text-green-500"
          bgColor="bg-green-100/20"
        />
        <StatCard
          title="Total Plans"
          value={stats.totalPlans}
          icon={Map}
          color="text-blue-500"
          bgColor="bg-blue-100/20"
        />
        <StatCard
          title="Subscriptions"
          value={stats.totalSubscriptions}
          icon={CreditCard}
          color="text-purple-500"
          bgColor="bg-purple-100/20"
        />
      </div>


      {/* GROWTH METRICS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Growth Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric label="7d Users" value={stats.last7DaysNewUsers} />
          <Metric label="30d Users" value={stats.last30DaysNewUsers} />
          <Metric label="7d Revenue" value={`৳${stats.last7daysRevenue}`} />
          <Metric label="30d Revenue" value={`৳${stats.last30daysRevenue}`} />
        </CardContent>
      </Card>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsPie
          title="Plan Status Distribution"
          description="Distribution of all travel plans by status"
          data={stats.planPieChartData}
          dataKey="count"
          nameKey="status"
        />

        <AnalyticsPie
          title="Subscription Distribution"
          description="Distribution of users by subscription plan"
          data={stats.subscriptionPieChartData}
          dataKey="count"
          nameKey="plan"
        />

      </div>

      <Separator />

      {/* RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUsersTable users={stats.recentUsers} />
        <RecentPlansTable plans={stats.recentPlans} />
      </div>
    </motion.div>
  );
}

const Metric = ({ label, value }: { label: string; value: number | string }) => (
  <div className="rounded-lg border p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);
