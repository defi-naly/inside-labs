import { Heart, ShoppingCart, Smartphone, Users, Sparkles } from "lucide-react";
import BentoCard from "./BentoCard";
import usp1 from "@/assets/usp-1.png";
import usp2 from "@/assets/usp-2.png";
import usp3 from "@/assets/usp-3.png";
import usp4 from "@/assets/usp-4.png";
import usp5 from "@/assets/usp-5.png";

const cards = [
  {
    icon: <Heart size={24} className="text-rose-500" />,
    headline: "Create long-lasting, meaningful, customer relationships",
    deeperText:
      "By using data to power your guest engagement. Understand your visitors on a deeper level and build connections that go beyond a single visit — turning first-time guests into lifelong advocates.",
    image: usp1,
    gradientFrom: "#f43f5e",
    gradientTo: "#ec4899",
    imagePosition: "right" as const,
  },
  {
    icon: <ShoppingCart size={24} className="text-blue-500" />,
    headline: "Drive more qualified traffic to your e-commerce layer",
    deeperText:
      "By supercharging your cross-channel marketing automation. Reach the right audience at the right time with personalized campaigns that convert browsers into buyers across every touchpoint.",
    image: usp2,
    gradientFrom: "#3b82f6",
    gradientTo: "#6366f1",
    imagePosition: "left" as const,
  },
  {
    icon: <Smartphone size={24} className="text-emerald-500" />,
    headline: "Launch a state of the art white-label app",
    deeperText:
      "And offer your guests a central platform that evolves based on their customer journey. From discovery to loyalty, the app adapts in real-time to deliver the most relevant experience.",
    image: usp3,
    gradientFrom: "#10b981",
    gradientTo: "#14b8a6",
    imagePosition: "right" as const,
  },
  {
    icon: <Users size={24} className="text-amber-500" />,
    headline: "Start your own membership programs",
    deeperText:
      "To boost loyalty & guest satisfaction. Design tiered membership experiences with exclusive perks, rewards, and personalized offers that keep your guests coming back.",
    image: usp4,
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
    imagePosition: "left" as const,
  },
  {
    icon: <Sparkles size={24} className="text-violet-500" />,
    headline: "Enable personalized omni-channel communication",
    deeperText:
      "Powered by cutting-edge AI technology. Deliver the right message on the right channel — email, push, SMS, or in-app — with intelligent automation that feels personal, not robotic.",
    image: usp5,
    gradientFrom: "#8b5cf6",
    gradientTo: "#a855f7",
    imagePosition: "right" as const,
  },
];

const OmniSuiteSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Meet the Omni Suite.
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
          Tourism's leading data-driven, event-triggered customer engagement
          platform.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {/* Row 1 — 2 large cards */}
        <div className="lg:col-span-3">
          <BentoCard {...cards[0]} delay={0} className="h-full" />
        </div>
        <div className="lg:col-span-3">
          <BentoCard {...cards[1]} delay={100} className="h-full" />
        </div>

        {/* Row 2 — 3 cards */}
        <div className="lg:col-span-2">
          <BentoCard {...cards[2]} delay={200} className="h-full" />
        </div>
        <div className="lg:col-span-2">
          <BentoCard {...cards[3]} delay={300} className="h-full" />
        </div>
        <div className="lg:col-span-2">
          <BentoCard {...cards[4]} delay={400} className="h-full" />
        </div>
      </div>
    </section>
  );
};

export default OmniSuiteSection;
