import { ActiveTravelPlans } from "@/components/modules/home/ActiveTravelPlans";
import { CallToActionSection } from "@/components/modules/home/CallToActionSection";
import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorksSection } from "@/components/modules/home/HowItWorkSection";
import { PopularDestinationsSection } from "@/components/modules/home/PopularDestinationSection";
import { TestimonialsSection } from "@/components/modules/home/TestimonialsSection";
import { TopTravelersSection } from "@/components/modules/home/TopTravelersSection";
import WhyChooseUsSection from "@/components/modules/home/WhyChooseUsSection";
import {
  getFeaturedTravelers,
  getFeaturedTravelPlans,
  getHomePageStats,
  getPopularDestinations
} from "@/services/home/home.service";

/**
 * Landing Page - Main entry point
 */
export default async function LandingPage() {
  // Fetch data with error handling
  const [stats, travelers, destinations, plans] = await Promise.all([
    getHomePageStats().catch(() => null),
    getFeaturedTravelers(6).catch(() => []),
    getPopularDestinations(4).catch(() => []),
    getFeaturedTravelPlans(6).catch(() => [])
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection stats={stats} />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6">
        <HowItWorksSection />
        <PopularDestinationsSection destinations={destinations} />
        <TopTravelersSection travelers={travelers} />
        <ActiveTravelPlans plans={plans} />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </div>

      <CallToActionSection />
    </div>
  );
}
