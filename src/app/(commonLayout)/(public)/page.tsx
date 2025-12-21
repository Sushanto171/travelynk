

import { CallToActionSection } from "@/components/modules/home/CallToActionSection";
import { FeaturedPlansSection } from '@/components/modules/home/FeaturedTravelersSection';
import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorksSection } from "@/components/modules/home/HowItWorkSection";
import { PopularDestinationsSection } from "@/components/modules/home/PopularDestinationSection";
import { TestimonialsSection } from "@/components/modules/home/TestimonialsSection";
import { TopTravelersSection } from "@/components/modules/home/TopTravelersSection";
import WhyChooseUsSection from "@/components/modules/home/WhyChooseUsSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col ">
      <HeroSection />

      <div className="mx-auto max-w-7xl">

      <HowItWorksSection />
      <PopularDestinationsSection />
      <TopTravelersSection />
      <FeaturedPlansSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      </div>
      <CallToActionSection />
    </div>
  );
}
