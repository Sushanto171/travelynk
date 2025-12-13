import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Route, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 space-y-24">
      {/* ---------------- HERO ---------------- */}
      <section className="text-center space-y-6">
        <Badge variant="secondary" className="text-sm">
          About the Platform
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Travel planning, simplified.
        </h1>

        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Our platform helps travelers plan trips, collaborate with companions,
          manage subscriptions, and share real experiences — all in one
          streamlined system.
        </p>
      </section>

      {/* ---------------- WHAT WE DO ---------------- */}
      <section className="grid md:grid-cols-4 gap-6">
        <Feature
          icon={<Route />}
          title="Smart Travel Plans"
          description="Create structured travel plans with destinations, dates, budgets, and itineraries."
        />
        <Feature
          icon={<Users />}
          title="Collaborative Travel"
          description="Invite companions, manage join requests, and travel together with clarity."
        />
        <Feature
          icon={<Globe />}
          title="Real Reviews"
          description="Authentic traveler reviews tied directly to completed travel plans."
        />
        <Feature
          icon={<ShieldCheck />}
          title="Secure & Scalable"
          description="Built with modern security practices and scalable architecture."
        />
      </section>

      {/* ---------------- VALUES ---------------- */}
      <section className="grid md:grid-cols-3 gap-6">
        <ValueCard
          title="Clarity Over Complexity"
          description="Every feature is designed to reduce friction and remove unnecessary steps."
        />
        <ValueCard
          title="Trust & Transparency"
          description="Verified users, real reviews, and accountable interactions."
        />
        <ValueCard
          title="Built for Scale"
          description="Architected to grow with users, data, and real-world usage."
        />
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Step index="01" title="Create a Plan">
            Define your destination, dates, budget, and itinerary.
          </Step>
          <Step index="02" title="Invite Travelers">
            Share your plan and manage who joins your journey.
          </Step>
          <Step index="03" title="Travel & Review">
            Complete the trip and leave verified reviews.
          </Step>
        </div>
      </section>

      {/* ---------------- TRUST ---------------- */}
      <section className="bg-muted rounded-2xl p-10 text-center space-y-6">
        <h2 className="text-3xl font-semibold">
          Built with reliability in mind
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          From secure authentication to subscription-based access control,
          every part of the platform is engineered with long-term reliability
          and maintainability.
        </p>

        <div className="flex justify-center gap-4">
          <Badge>Secure Payments</Badge>
          <Badge>Role-Based Access</Badge>
          <Badge>Audit-Ready</Badge>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">
          Start planning your next journey
        </h2>
        <p className="text-muted-foreground">
          Join travelers who plan smarter and travel better.
        </p>

        <Button size="lg">Get Started</Button>
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Feature({
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
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}

function ValueCard({
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

function Step({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <Badge variant="outline">{index}</Badge>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {children}
      </CardContent>
    </Card>
  );
}
