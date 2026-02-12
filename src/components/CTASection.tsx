import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
      {/* Gradient ribbon accent */}
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[160%] w-[60%] opacity-[0.15]"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(280 70% 50%) 50%, hsl(200 80% 50%) 100%)",
          transform: "rotate(-15deg)",
          borderRadius: "40% 60% 70% 30% / 40% 30% 60% 70%",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-background md:text-5xl">
          Discover the full Omni Suite.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-background/60">
          The Omni Suite tiers enable you to build everything from simple marketing automations 
          to a complete digital guest experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/omni-suite"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-90"
          >
            Explore the Omni Suite
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-background/20 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-background/10"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;