"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSubscription } from "@/services/subscription/subscription.service";
import { Check } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  title: string;
  price: string;
  billing?: string;
  features: string[];
  cta: string;
  planType: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  highlight?: boolean;
}

export const PricingCard = ({
  title,
  price,
  billing = "",
  features,
  cta,
  highlight = false,
  planType,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    startTransition(async () => {
      const res = await createSubscription(planType);
      console.log({ res });
      if (res?.success) {
        setSuccess(true);
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    });
  };

  return (
    <Card
      className={`relative rounded-2xl border-2 ${highlight ? "border-primary shadow-xl scale-105" : "border-border"
        } transition`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <CardHeader className="text-center space-y-2 pt-8">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex items-end justify-center gap-1">
          <span className="text-5xl font-extrabold">${price}</span>
          <span className="text-muted-foreground mb-1">{billing}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          onClick={handleSubscribe}
          disabled={isPending || success}
        >
          {isPending ? "Processing..." : success ? "Subscribed" : cta}
        </Button>

      </CardContent>
    </Card>
  );
};
