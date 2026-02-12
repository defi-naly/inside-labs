import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      {/* Red gradient accent */}
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[160%] w-[60%] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, hsl(355 78% 56%) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Discover the full Omni Suite.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary">
          The Omni Suite tiers enable you to build everything from simple marketing automations 
          to a complete digital guest experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/omni-suite"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Explore the Omni Suite
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
