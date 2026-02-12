import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import usp3 from "@/assets/usp-3.png";

const bullets = [
  { icon: Zap, text: "Event-triggered campaigns that convert anonymous visitors" },
  { icon: Users, text: "Purpose-built for tourism, hospitality & destinations" },
  { icon: TrendingUp, text: "Proven to drive 300% increase in online revenue" },
];

const HeroSection = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 500),
      setTimeout(() => setStage(3), 900),
      setTimeout(() => setStage(4), 1300),
      setTimeout(() => setStage(5), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-28 pb-12">
      {/* Red pulsing halo */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "30%",
          left: "50%",
          width: "600px",
          height: "600px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(230,57,70,0.10) 0%, transparent 70%)",
          animation: "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto w-full max-w-4xl px-6 text-center">
        <p
          className="text-sm font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-700 ease-out mb-6"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Inside Labs
        </p>

        <h1
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl transition-all duration-700 ease-out mb-8"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(24px)",
          }}
        >
          Engage with
          <br />
          <span className="text-primary">Intelligence.</span>
        </h1>

        {/* Value bullets */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10 transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {bullets.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.text} className="flex items-start gap-3 max-w-[260px] text-left">
                <Icon size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-snug text-secondary">{b.text}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Product screenshot */}
        <div
          className="relative mx-auto max-w-3xl transition-all duration-1000 ease-out"
          style={{
            opacity: stage >= 5 ? 1 : 0,
            transform: stage >= 5 ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          }}
        >
          <div className="rounded-xl border border-border overflow-hidden shadow-2xl shadow-primary/5">
            <img
              src={usp3}
              alt="Omni Suite product screenshot"
              className="w-full h-auto"
            />
          </div>
          {/* Glow behind screenshot */}
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 80%, hsl(355 85% 40% / 0.08), transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
