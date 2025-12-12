
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="bg-indigo-600 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Ready to find your travel buddy?
        </h2>

        <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
          Join Travelynk and access premium matches, priority placement, and trusted travelers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
          >
            See Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
