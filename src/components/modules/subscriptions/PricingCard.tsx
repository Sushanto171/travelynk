"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createSubscription } from "@/services/subscription/subscription.service";
import { motion } from "framer-motion";
import { Check, Plane } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  title: string;
  price: string;
  billing?: string;
  originalPrice?: string;
  features: string[];
  cta: string;
  planType: "FREE" | "WEEKLY" | "MONTHLY" | "YEARLY";
  highlight?: boolean;
  icon?: React.ReactNode;
  badge?: string;
}

export const PricingCard = ({
  title,
  price,
  billing = "",
  originalPrice,
  features,
  cta,
  highlight = false,
  planType,
  icon,
  badge
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    if (planType === "FREE") {
      toast.info("You're already on the free plan!");
      return;
    }

    startTransition(async () => {
      const res = await createSubscription(planType);
      if (res?.success) {
        setSuccess(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className={`relative h-full flex flex-col rounded-2xl border-2 transition-all ${highlight
            ? "border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-b from-primary/5 to-background"
            : "border-border hover:border-primary/50 hover:shadow-lg"
          }`}
      >
        {/* Badge */}
        {badge && (
          <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${highlight
              ? "bg-gradient-to-r from-primary to-emerald-500 text-white"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            }`}>
            <Plane className="w-3 h-3 inline mr-1" />
            {badge}
          </div>
        )}

        <CardHeader className="text-center space-y-4 pt-8 pb-6">
          {/* Icon */}
          {icon && (
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto ${highlight
                ? "bg-gradient-to-br from-primary to-emerald-500 text-white"
                : "bg-primary/10 text-primary"
              }`}>
              {icon}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold">{title}</h3>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-extrabold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                ${price}
              </span>
              <span className="text-muted-foreground mb-2 text-lg">{billing}</span>
            </div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground">
                <span className="line-through">${originalPrice}</span>
                <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                  Save ${Number(originalPrice) - Number(price)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-6 px-6 pb-8">
          {/* Features List */}
          <ul className="space-y-3 flex-grow">
            {features.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${highlight ? "bg-primary/20" : "bg-muted"
                  }`}>
                  <Check className={`h-3 w-3 ${highlight ? "text-primary" : "text-foreground"}`} />
                </div>
                <span className="text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            className={`w-full h-12 text-base font-semibold ${highlight
                ? "bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-lg shadow-primary/30"
                : ""
              }`}
            variant={highlight ? "default" : "outline"}
            onClick={handleSubscribe}
            disabled={isPending || success}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : success ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Subscribed!
              </span>
            ) : (
              cta
            )}
          </Button>

          {planType === "FREE" && (
            <p className="text-xs text-center text-muted-foreground">
              No credit card required
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
