import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 500),
      setTimeout(() => setStage(3), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-transparent pt-40 pb-32 lg:pt-48 lg:pb-40">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "40%",
          left: "50%",
          width: "800px",
          height: "800px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsl(355 85% 40% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-3xl px-6 text-center">
        <h1
          className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "translateY(0)" : "translateY(24px)",
          }}
        >
          Turn anonymous visitors into
          <br />
          <span className="text-primary">lifelong advocates.</span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          The event-triggered engagement platform purpose-built for tourism.
          Activate guests across every channel with data they already generate.
        </p>

        <div
          className="mt-10 transition-all duration-700 ease-out"
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
    </section>
  );
};

export default HeroSection;
