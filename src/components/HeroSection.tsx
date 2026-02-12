import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroMountains from "@/assets/hero-mountains.jpg";

const HeroSection = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mountain background */}
      <img
        src={heroMountains}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.4) 50%, hsl(0 0% 0% / 0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center pt-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70 transition-all duration-700 ease-out mb-6"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Inside Labs
        </p>

        <h1
          className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl transition-all duration-700 ease-out mb-6"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(24px)",
          }}
        >
          Engage with{" "}
          <span className="text-primary">Intelligence.</span>
        </h1>

        <p
          className="mx-auto max-w-xl text-lg leading-relaxed text-primary-foreground/70 transition-all duration-700 ease-out mb-10"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Tourism's leading event-triggered engagement platform —
          turning anonymous visitors into lifelong advocates.
        </p>

        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            See it on your data
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
