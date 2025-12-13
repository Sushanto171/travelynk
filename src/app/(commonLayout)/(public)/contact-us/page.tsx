"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 space-y-24">
      {/* ---------------- HERO ---------------- */}
      <section className="text-center space-y-6">
        <Badge variant="secondary">Contact Us</Badge>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Let’s talk
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions, feedback, or need support?  
          Reach out — our team is here to help.
        </p>
      </section>

      {/* ---------------- CONTENT ---------------- */}
      <section className="grid md:grid-cols-2 gap-10">
        {/* -------- Contact Info -------- */}
        <div className="space-y-6">
          <InfoCard
            icon={<Mail />}
            title="Email"
            value="support@yourplatform.com"
            description="Reach us anytime via email."
          />
          <InfoCard
            icon={<Phone />}
            title="Phone"
            value="+880 1XXX-XXXXXX"
            description="Available during business hours."
          />
          <InfoCard
            icon={<MapPin />}
            title="Location"
            value="Bangladesh"
            description="Operating remotely with global reach."
          />

          <Card className="bg-muted">
            <CardContent className="p-6 text-sm text-muted-foreground">
              We typically respond within <strong>24 hours</strong>.  
              For billing or subscription issues, please include your account
              email for faster resolution.
            </CardContent>
          </Card>
        </div>

        {/* -------- Contact Form -------- */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Full name" />
              <Input type="email" placeholder="Email address" />
            </div>

            <Input placeholder="Subject" />

            <Textarea
              placeholder="Write your message here..."
              className="min-h-[140px]"
            />

            <Button className="w-full gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ---------------- TRUST ---------------- */}
      <section className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Your information is handled securely and never shared with third
          parties.
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline">Secure Communication</Badge>
          <Badge variant="outline">Privacy First</Badge>
          <Badge variant="outline">Human Support</Badge>
        </div>
      </section>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function InfoCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
