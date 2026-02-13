import { useState } from "react";
import BentoCard from "./BentoCard";
import ExpandedCard from "./ExpandedCard";
import usp1 from "@/assets/usp-1.png";
import usp2 from "@/assets/usp-2.png";
import usp3 from "@/assets/usp-3.png";
import usp4 from "@/assets/usp-4.png";
import usp5 from "@/assets/usp-5.png";

const cards = [
  {
    headline: "Create long-lasting, meaningful, customer relationships",
    image: usp1,
    accentColor: "#e11d48",
    expanded: {
      headline: "Create long-lasting, meaningful, customer relationships",
      subtitle: "Use data to power your guest engagement. Understand visitors on a deeper level and build connections beyond a single visit.",
      description: "Turn first-time guests into lifelong advocates with intelligent CRM that adapts to every touchpoint in the guest journey — from discovery through post-visit follow-up.",
      stats: [
        { value: "3.2x", label: "repeat visit rate", highlight: true },
        { value: "89%", label: "guest satisfaction" },
        { value: "47%", label: "higher lifetime value" },
      ],
      bullets: [
        { text: "Unified guest profiles across all channels" },
        { text: "Automated journey mapping & segmentation" },
        { text: "Predictive engagement scoring" },
        { text: "Real-time behavioral triggers" },
      ],
      chartBars: [30, 45, 40, 55, 50, 65, 60, 72, 68, 80, 85, 92],
    },
  },
  {
    headline: "Drive more qualified traffic to your e-commerce layer",
    image: usp2,
    accentColor: "#e11d48",
    expanded: {
      headline: "Drive more qualified traffic to your e-commerce layer",
      subtitle: "Supercharge your cross-channel marketing automation. Reach the right audience at the right time with personalized campaigns.",
      description: "Convert browsers into buyers across every touchpoint with AI-powered campaign orchestration that optimizes delivery, messaging, and timing automatically.",
      stats: [
        { value: "2.8x", label: "conversion uplift", highlight: true },
        { value: "0.06%", label: "fraudulent disputes" },
        { value: "34%", label: "revenue increase" },
      ],
      bullets: [
        { text: "Cross-channel campaign orchestration" },
        { text: "Dynamic audience segmentation" },
        { text: "A/B testing with auto-optimization" },
        { text: "Revenue attribution tracking" },
      ],
      chartBars: [25, 35, 42, 38, 55, 48, 62, 70, 65, 78, 82, 90],
    },
  },
  {
    headline: "Launch a state of the art white-label app",
    image: usp3,
    accentColor: "#e11d48",
    expanded: {
      headline: "Launch a state of the art white-label app",
      subtitle: "Offer your guests a central platform that evolves based on their customer journey. From discovery to loyalty.",
      description: "The app adapts in real-time to deliver the most relevant experience — personalized content, offers, and features that match each guest's stage and preferences.",
      stats: [
        { value: "4.8★", label: "avg app rating", highlight: true },
        { value: "62%", label: "adoption rate" },
        { value: "18min", label: "avg session time" },
      ],
      bullets: [
        { text: "Fully branded native iOS & Android apps" },
        { text: "Dynamic content personalization" },
        { text: "Push notification automation" },
        { text: "Offline-capable with sync" },
      ],
      chartBars: [20, 30, 45, 50, 48, 60, 65, 58, 72, 80, 88, 95],
    },
  },
  {
    headline: "Start your own membership programs",
    image: usp4,
    accentColor: "#e11d48",
    expanded: {
      headline: "Start your own membership programs",
      subtitle: "Boost loyalty & guest satisfaction with tiered membership experiences, exclusive perks, and personalized rewards.",
      description: "Design membership tiers with intelligent reward mechanics that keep guests engaged and spending — while giving you deep insight into your most valuable customers.",
      stats: [
        { value: "156%", label: "member spend uplift", highlight: true },
        { value: "72%", label: "renewal rate" },
        { value: "5.1x", label: "engagement boost" },
      ],
      bullets: [
        { text: "Flexible tier structures & rewards" },
        { text: "Points, perks & exclusive access" },
        { text: "Automated tier progression" },
        { text: "Member analytics dashboard" },
      ],
      chartBars: [35, 40, 38, 50, 55, 52, 68, 72, 75, 82, 88, 94],
    },
  },
  {
    headline: "Enable personalized omni-channel communication",
    image: usp5,
    accentColor: "#e11d48",
    expanded: {
      headline: "Enable personalized omni-channel communication",
      subtitle: "Powered by cutting-edge AI technology. Deliver the right message on the right channel — email, push, SMS, or in-app.",
      description: "Intelligent automation that feels personal, not robotic. Our AI learns guest preferences and optimizes every message for timing, channel, and content.",
      stats: [
        { value: "94%", label: "delivery rate", highlight: true },
        { value: "3.4x", label: "open rate vs industry" },
        { value: "41%", label: "click-through rate" },
      ],
      bullets: [
        { text: "AI-powered message optimization" },
        { text: "Smart channel selection per user" },
        { text: "Multi-language content generation" },
        { text: "Real-time performance analytics" },
      ],
      chartBars: [40, 35, 50, 55, 60, 58, 70, 75, 72, 85, 90, 96],
    },
  },
];

const OmniSuiteSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <>
      <section
        className="w-full border-t border-border/40"
        style={{ background: "linear-gradient(180deg, hsl(230, 15%, 3%) 0%, hsl(230, 12%, 6%) 50%, hsl(230, 15%, 3%) 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-3">
            <BentoCard
              {...cards[0]}
              delay={0}
              className="h-full"
              onClick={() => setExpandedIndex(0)}
            />
          </div>
          <div className="lg:col-span-3">
            <BentoCard
              {...cards[1]}
              delay={100}
              className="h-full"
              onClick={() => setExpandedIndex(1)}
            />
          </div>
          <div className="lg:col-span-2">
            <BentoCard
              {...cards[2]}
              delay={200}
              className="h-full"
              onClick={() => setExpandedIndex(2)}
            />
          </div>
          <div className="lg:col-span-2">
            <BentoCard
              {...cards[3]}
              delay={300}
              className="h-full"
              onClick={() => setExpandedIndex(3)}
            />
          </div>
          <div className="lg:col-span-2">
            <BentoCard
              {...cards[4]}
              delay={400}
              className="h-full"
              onClick={() => setExpandedIndex(4)}
            />
          </div>
        </div>
        </div>
      </section>

      {/* Expanded overlay */}
      {expandedIndex !== null && (
        <ExpandedCard
          data={{
            ...cards[expandedIndex].expanded,
            image: cards[expandedIndex].image,
            accentColor: cards[expandedIndex].accentColor,
          }}
          onClose={() => setExpandedIndex(null)}
        />
      )}
    </>
  );
};

export default OmniSuiteSection;