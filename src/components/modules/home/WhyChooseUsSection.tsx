
import { Shield, Users, Globe } from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      text: "AI-assisted travel buddy matching based on compatibility.",
    },
    {
      icon: Shield,
      title: "Verified Travelers",
      text: "Premium badge system for trusted members.",
    },
    {
      icon: Globe,
      title: "Global Community",
      text: "Connect with explorers from around the world.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Travelynk?</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="text-center">
            <f.icon className="h-10 w-10 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
