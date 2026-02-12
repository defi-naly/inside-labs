import { ArrowRight } from "lucide-react";
import IntelligenceMesh from "./IntelligenceMesh";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-28">
      {/* 3D Mesh — pushed right 60% */}
      <div className="pointer-events-auto absolute top-0 right-0 bottom-0 w-[70%] z-0">
        <IntelligenceMesh />
      </div>

      {/* Red pulsing halo behind mesh center */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "50%",
          right: "15%",
          width: "400px",
          height: "400px",
          transform: "translate(50%, -50%)",
          background: "radial-gradient(circle, rgba(230,57,70,0.12) 0%, transparent 70%)",
          animation: "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        }}
      />

      {/* Content left-aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Welcome to Inside Labs
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Engage with Intelligence.
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-secondary">
            Tourism's leading data-driven, event-triggered customer engagement
            platform. From first touch to lifelong loyalty.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/omni-suite"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Explore the Omni Suite
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
