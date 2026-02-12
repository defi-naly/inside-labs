import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-28">
      {/* Stripe-style gradient ribbon */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main ribbon - flowing diagonal */}
        <div
          className="absolute -right-[20%] -top-[20%] h-[140%] w-[80%] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(340 80% 55%) 20%, hsl(280 70% 50%) 40%, hsl(240 60% 55%) 60%, hsl(200 80% 50%) 80%, hsl(170 70% 45%) 100%)",
            transform: "rotate(-12deg) skewY(-6deg)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            filter: "blur(60px)",
          }}
        />
        {/* Secondary ribbon accent */}
        <div
          className="absolute -left-[10%] bottom-[10%] h-[60%] w-[50%] opacity-[0.08]"
          style={{
            background:
              "linear-gradient(225deg, hsl(0 84% 60%) 0%, hsl(20 90% 55%) 50%, hsl(40 90% 50%) 100%)",
            transform: "rotate(8deg)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(80px)",
          }}
        />
        {/* Top-left warm accent */}
        <div
          className="absolute -left-[5%] -top-[10%] h-[50%] w-[40%] opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, hsl(0 84% 60%), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Welcome to Inside Labs
          </p>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-foreground md:text-7xl lg:text-8xl">
            Engage with{" "}
            <span className="relative">
              Intelligence
              <span
                className="absolute -bottom-2 left-0 h-3 w-full opacity-20 rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(0 84% 60%), hsl(280 70% 50%), hsl(200 80% 50%))",
                }}
              />
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Tourism's leading data-driven, event-triggered customer engagement platform. 
            From first touch to lifelong loyalty.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/omni-suite"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90"
            >
              Explore the Omni Suite
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;