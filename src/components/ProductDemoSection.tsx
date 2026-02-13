import { Compass, Radio, ShoppingBag, Gamepad2, Wallet, Star, Download, Users, Award, Utensils, Map, Mountain, CloudSun, Ticket, Trophy, Medal, CreditCard, Bell, Bike, Timer, Gift } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

const CYCLE_INTERVAL = 5000;
const PAUSE_AFTER_CLICK = 10000;

// Feature icons per pillar (not translated — icons stay the same)
const pillarIcons = [
  { icon: Compass, featureIcons: [Bell, Utensils, Map, Bike, Ticket] },
  { icon: Radio, featureIcons: [CloudSun, Mountain, Map, Utensils, Mountain] },
  { icon: ShoppingBag, featureIcons: [Ticket, Map, Gift, Utensils, ShoppingBag] },
  { icon: Gamepad2, featureIcons: [Timer, Trophy, Map, Users, Medal] },
  { icon: Wallet, featureIcons: [Ticket, CreditCard, Gift, CreditCard, Star] },
];

const pillarScreenImages = [
  "/images/app-screens/laax-explore.png",  // For You — Explore page
  "/images/app-screens/laax-live.png",     // Live — Slopes, map, conditions
  "/images/app-screens/laax-shop.png",     // Shop — Tickets, experiences, commerce
  "/images/app-screens/laax-play.png",     // Play — Leaderboards, gamification
  "/images/app-screens/laax-wallet.png",   // Wallet — Food ordering & payments
];

const pillarScreenColors = [
  "hsl(355 85% 50%)",
  "hsl(200 80% 50%)",
  "hsl(30 90% 50%)",
  "hsl(280 70% 55%)",
  "hsl(160 60% 45%)",
];

const statConfig = [
  { icon: Star, value: "4.9", suffix: "★" },
  { icon: Download, value: "200k+" },
  { icon: Users, value: "62%" },
  { icon: Award, value: "#1" },
];

// Themed phone frame
const ImageFrame = ({ activeIndex, t }: { activeIndex: number; t: (key: string) => string }) => {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Outer glow */}
      <div
        className="absolute -inset-6 rounded-[3rem] opacity-25 blur-3xl transition-colors duration-500"
        style={{ background: `radial-gradient(ellipse at center, ${pillarScreenColors[activeIndex]}30, transparent 70%)` }}
      />

      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] border-[3px] border-[hsl(230_12%_16%)] bg-[hsl(230_15%_6%)] p-[6px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        {/* Inner bezel */}
        <div className="relative rounded-[2.2rem] overflow-hidden bg-black">
          {/* Notch / Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] rounded-full bg-[hsl(230_15%_6%)] z-20 border border-[hsl(230_10%_12%)]" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 pt-4">
            <span className="text-[9px] font-semibold text-white/60">9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <div className="h-1.5 w-3 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Image area */}
          <div className="relative" style={{ aspectRatio: "9 / 19.5" }}>
            {pillarScreenImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${t(`productDemo.pillars[${i}].label`)} screen`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-white/20 z-10" />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute top-[100px] -right-[4px] w-[3px] h-[50px] rounded-r bg-[hsl(230_10%_14%)]" />
      <div className="absolute top-[80px] -left-[4px] w-[3px] h-[24px] rounded-l bg-[hsl(230_10%_14%)]" />
      <div className="absolute top-[120px] -left-[4px] w-[3px] h-[40px] rounded-l bg-[hsl(230_10%_14%)]" />
      <div className="absolute top-[170px] -left-[4px] w-[3px] h-[40px] rounded-l bg-[hsl(230_10%_14%)]" />
    </div>
  );
};

const ProductDemoSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cycleNext = useCallback(() => {
    if (Date.now() < pausedUntil.current) return;
    setActiveIndex((prev) => (prev + 1) % pillarIcons.length);
  }, []);

  useEffect(() => {
    const id = setInterval(cycleNext, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, [cycleNext]);

  const handlePillarClick = (i: number) => {
    setActiveIndex(i);
    pausedUntil.current = Date.now() + PAUSE_AFTER_CLICK;
  };

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("productDemo.eyebrow")}
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
            {t("productDemo.headline")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("productDemo.subtitle")}
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {statConfig.map((s, i) => {
            const Icon = s.icon;
            const label = t(`productDemo.stats[${i}].label`);
            return (
              <div
                key={label}
                className="text-center rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-5 transition-all duration-500"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <Icon size={16} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{s.value}<span className="text-primary">{s.suffix || ""}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/50 mb-20 max-w-3xl mx-auto">
          {t("productDemo.basedOn")}
        </p>

        {/* Pillar tabs — full-width row above grid */}
        <div
          className="grid grid-cols-5 gap-3 mb-12 max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "150ms",
          }}
        >
          {pillarIcons.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeIndex === i;
            const label = t(`productDemo.pillars[${i}].label`);
            return (
              <button
                key={i}
                onClick={() => handlePillarClick(i)}
                className={cn(
                  "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/40 bg-card/20 text-muted-foreground hover:border-border/60 hover:bg-card/40"
                )}
              >
                <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Side-by-side: phone left, info right */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-10 items-start max-w-3xl mx-auto">
          {/* Phone — left */}
          <div
            className="flex justify-start transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: "200ms",
            }}
          >
            <ImageFrame activeIndex={activeIndex} t={t} />
          </div>

          {/* Info — right */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transitionDelay: "300ms",
            }}
          >
            {/* Active pillar description */}
            <div className="mb-6 min-h-[4.5rem]">
              <p className="text-2xl font-semibold text-foreground mb-2">{t(`productDemo.pillars[${activeIndex}].label`)}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{t(`productDemo.pillars[${activeIndex}].desc`)}</p>
            </div>

            {/* Feature list */}
            <div className="space-y-2 mb-8">
              {pillarIcons[activeIndex].featureIcons.map((FeatureIcon, fi) => (
                <div
                  key={fi}
                  className="flex items-start gap-3 rounded-xl border border-border/30 bg-card/30 px-5 py-3.5 transition-all duration-300"
                >
                  <FeatureIcon size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-base text-foreground/80 leading-relaxed">{t(`productDemo.pillars[${activeIndex}].features[${fi}]`)}</span>
                </div>
              ))}
            </div>

            {/* App store badges */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="font-semibold text-foreground">4.9</span> {t("productDemo.onAppStore")}
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="font-semibold text-foreground">4.7</span> {t("productDemo.onGooglePlay")}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground/50">{t("productDemo.appRatingsNote")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
