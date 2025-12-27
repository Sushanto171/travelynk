/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeForNewslatter } from "@/services/admin/newslatterManagement";
import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewslatterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await subscribeForNewslatter({ email });
      setIsSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h4 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Stay Updated
        </h4>
        <p className="text-sm text-muted-foreground">
          Subscribe to get the latest travel tips, destination guides, and exclusive offers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isSubscribed}
          className="flex-grow"
          required
        />
        <Button
          type="submit"
          disabled={isLoading || isSubscribed}
          className="min-w-[120px]"
        >
          {isLoading ? (
            "Subscribing..."
          ) : isSubscribed ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Subscribed
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </div>
  );
}