import { ArrowRight } from "lucide-react";
import IntelligenceMesh from "./IntelligenceMesh";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-28">
      {/* Stripe-style gradient ribbon — subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[20%] -top-[20%] h-[140%] w-[80%] opacity-[0.08]"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(340 80% 55%) 25%, hsl(0 0% 20%) 50%, hsl(0 84% 60%) 75%, hsl(340 60% 45%) 100%)",
            transform: "rotate(-12deg) skewY(-6deg)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -left-[5%] -top-[10%] h-[50%] w-[40%] opacity-[0.04]"
          style={{
            background: "radial-gradient(ellipse, hsl(0 84% 60%), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left — Text */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Welcome to Inside Labs
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Engage with{" "}
              <span className="relative inline-block">
                Intelligence
                <span
                  className="absolute -bottom-1.5 left-0 h-2 w-full rounded-full opacity-30"
                  style={{
                    background: "linear-gradient(90deg, hsl(0 84% 60%), hsl(0 0% 30%))",
                  }}
                />
              </span>
              .
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Tourism's leading data-driven, event-triggered customer engagement
              platform. From first touch to lifelong loyalty.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/omni-suite"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90"
              >
                Explore the Omni Suite
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right — 3D Mesh */}
          <div className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-none">
            <IntelligenceMesh />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;