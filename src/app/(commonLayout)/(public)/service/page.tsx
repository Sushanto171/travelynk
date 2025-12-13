import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Route,
  Users,
  Star,
  CreditCard,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 space-y-24">
      {/* ---------------- HERO ---------------- */}
      <section className="text-center space-y-6">
        <Badge variant="secondary">Our Services</Badge>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Everything you need to plan, manage, and travel smarter
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We provide a complete travel planning ecosystem — from structured trip
          creation to subscriptions, collaboration, and verified reviews.
        </p>
      </section>

      {/* ---------------- CORE SERVICES ---------------- */}
      <section className="grid md:grid-cols-3 gap-6">
        <ServiceCard
          icon={<Route />}
          title="Travel Plan Management"
          description="Create detailed travel plans with destinations, itineraries, budgets, and timelines — all structured and easy to manage."
        />
        <ServiceCard
          icon={<Users />}
          title="Traveler Collaboration"
          description="Invite travelers, manage join requests, approve participants, and coordinate trips seamlessly."
        />
        <ServiceCard
          icon={<Star />}
          title="Verified Reviews"
          description="Leave and view authentic reviews tied to real travel plans for transparency and trust."
        />
        <ServiceCard
          icon={<CreditCard />}
          title="Subscription System"
          description="Flexible subscription plans with secure payments, lifecycle tracking, and billing history."
        />
        <ServiceCard
          icon={<LayoutDashboard />}
          title="Admin Management"
          description="Powerful admin dashboards for managing users, plans, reviews, and subscriptions."
        />
        <ServiceCard
          icon={<ShieldCheck />}
          title="Security & Access Control"
          description="Role-based permissions, verified users, and audit-ready system design."
        />
      </section>

      {/* ---------------- PLATFORM CAPABILITIES ---------------- */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">
          Platform capabilities
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Capability
            title="Scalable Architecture"
            description="Built using modern frontend and backend patterns that scale with traffic, data, and feature growth."
          />
          <Capability
            title="Clean & Consistent UI"
            description="Reusable components powered by shadcn/ui ensure visual consistency and fast iteration."
          />
          <Capability
            title="Real-Time Feedback"
            description="Instant UI updates for joins, approvals, payments, and moderation actions."
          />
          <Capability
            title="Operational Visibility"
            description="Admin-friendly tables, filters, and audit fields across all modules."
          />
        </div>
      </section>

      {/* ---------------- SUBSCRIPTION VALUE ---------------- */}
      <section className="bg-muted rounded-2xl p-10 space-y-6 text-center">
        <h2 className="text-3xl font-semibold">
          Subscription-driven value
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Premium subscriptions unlock advanced planning tools, higher limits,
          priority access, and enhanced collaboration features.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Badge>Priority Access</Badge>
          <Badge>Extended Limits</Badge>
          <Badge>Premium Features</Badge>
          <Badge>Secure Billing</Badge>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">
          Ready to explore our services?
        </h2>

        <p className="text-muted-foreground">
          Start planning smarter and managing trips with confidence.
        </p>

        <Button size="lg">View Pricing</Button>
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {description}
      </CardContent>
    </Card>
  );
}

function Capability({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}
