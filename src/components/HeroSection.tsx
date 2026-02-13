import { useEffect, useState } from "react";
import WireframeMountain from "@/components/WireframeMountain";
import { useTranslation } from "@/i18n";

const clientLogos = [
  { src: "/images/logos/laax.svg", alt: "LAAX", filter: false },
  { src: "/images/logos/zermatt.svg", alt: "Zermatt Bergbahnen", filter: false },
  { src: "/images/logos/engadin_logo.svg", alt: "Engadin", filter: false },
  { src: "/images/logos/stmoritz.svg", alt: "St. Moritz", filter: false },
  { src: "/images/logos/davos.png", alt: "Davos Klosters", filter: false },
  { src: "/images/logos/bikekingdom.jpg", alt: "Bike Kingdom", filter: true },
  { src: "/images/logos/lenzerheide.svg", alt: "Lenzerheide", filter: false },
  { src: "/images/logos/schwyz.svg", alt: "Schwyz Tourismus", filter: false },
];

const HeroSection = () => {
  const [stage, setStage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1000),
      setTimeout(() => setStage(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const logoElements = clientLogos.map((logo, i) => (
    <img
      key={`${logo.alt}-${i}`}
      src={logo.src}
      alt={logo.alt}
      className={
        logo.filter
          ? "h-8 w-auto shrink-0 object-contain invert mix-blend-screen brightness-[2] opacity-60 md:h-10"
          : "h-8 w-auto shrink-0 object-contain opacity-60 md:h-10"
      }
    />
  ));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Wireframe mountain background */}
      <WireframeMountain />

      {/* Radial vignette behind text — subtle, not heavy */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 45% at 50% 42%, hsl(0 0% 0% / 0.35), transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center pt-20">
        <p
          className="text-sm font-bold uppercase tracking-[0.3em] text-white transition-all duration-700 ease-out mb-6"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl transition-all duration-700 ease-out mb-6"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {t("hero.headline")}{" "}
          <span className="text-primary">{t("hero.headlineAccent")}</span>
        </h1>

        <p
          className="mx-auto max-w-xl text-sm md:text-base font-normal leading-relaxed text-white/80 transition-all duration-700 ease-out mb-10"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {t("hero.subtitle")}
        </p>

      </div>

      {/* Client logo showreel — pinned to hero bottom */}
      <div
        className="absolute bottom-12 left-0 right-0 z-10 transition-all duration-700 ease-out"
        style={{
          opacity: stage >= 4 ? 1 : 0,
          transform: stage >= 4 ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
          {t("hero.logoBar")}
        </p>

        <div className="group relative overflow-hidden">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Scrolling track */}
          <div className="flex animate-marquee items-center gap-14 hover:[animation-play-state:paused] will-change-transform">
            {logoElements}
            {logoElements}
          </div>
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[9]" />
    </section>
  );
};

export default HeroSection;
