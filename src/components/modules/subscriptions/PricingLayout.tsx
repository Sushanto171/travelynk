
import { PricingCard } from "./PricingCard";

export const PricingLayout = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Flexible pricing designed to scale with your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Plan */}
        <PricingCard
          title="Weekly"
          price="5"
          billing="/week"
          features={["Basic access", "Community support", "Limited usage"]}
          cta="Start Weekly"
          planType={"WEEKLY"} // pass enum
        />

        <PricingCard
          title="Monthly"
          price="25"
          billing="/mo"
          features={["Unlimited access", "Priority support", "Advanced analytics"]}
          highlight
          cta="Subscribe Monthly"
          planType={"MONTHLY"}
        />

        <PricingCard
          title="Yearly"
          price="300"
          billing="/yr"
          features={["Unlimited access", "Priority support", "Advanced analytics"]}
          cta="Subscribe Yearly"
          planType={"YEARLY"}
        />

      </div>
    </section>
  );
};
