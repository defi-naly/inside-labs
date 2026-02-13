import { Compass, Radio, ShoppingBag, Gamepad2, Wallet, Star, Download, Users, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import omniAppPhone from "@/assets/omni-app-phone.png";

const pillars = [
  { icon: Compass, label: "For You", desc: "Personalized guides, trails & destination info" },
  { icon: Radio, label: "Live", desc: "Real-time webcams, weather & lift status" },
  { icon: ShoppingBag, label: "Shop", desc: "Tickets, rentals & experiences in a few taps" },
  { icon: Gamepad2, label: "Play", desc: "Gamification, challenges & rewards" },
  { icon: Wallet, label: "Wallet", desc: "Digital guestcard, loyalty & payments" },
];

const stats = [
  { icon: Star, value: "4.9", label: "App Store Rating", suffix: "★" },
  { icon: Download, value: "200k+", label: "Downloads" },
  { icon: Users, value: "62%", label: "Adoption Rate" },
  { icon: Award, value: "#1", label: "Tourism App CH" },
];

const ProductDemoSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Featuring the Omni App
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
            The key to your resort.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A white-label native app for iOS & Android that becomes the digital
            heartbeat of your destination — personalized, data-driven, and loved
            by guests.
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="text-center rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-5 transition-all duration-500"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <Icon size={16} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{s.value}<span className="text-primary">{s.suffix || ""}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main layout: app image + pillars */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Single hero app image */}
          <div
            className="relative flex items-center justify-center transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative w-full max-w-[320px] mx-auto">
              <div className="rounded-3xl border border-border/40 overflow-hidden shadow-2xl shadow-primary/10">
                <img
                  src={omniAppPhone}
                  alt="Omni App — Explore screen"
                  className="w-full h-auto animate-[float_6s_ease-in-out_infinite]"
                />
              </div>
              {/* Glow behind */}
              <div
                className="pointer-events-none absolute -inset-12 -z-10 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, hsl(355 85% 40% / 0.08), transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* Pillars list */}
          <div className="space-y-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="flex items-start gap-4 rounded-xl border border-border/40 bg-card/30 px-5 py-4 transition-all duration-500 hover:border-primary/20 hover:bg-card/60"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(24px)",
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{p.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* App store badges */}
            <div
              className="flex items-center gap-3 pt-4 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transitionDelay: "800ms",
              }}
            >
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground">
                <Star size={12} className="text-primary fill-primary" />
                <span className="font-semibold text-foreground">4.9</span> on App Store
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-xs text-muted-foreground">
                <Star size={12} className="text-primary fill-primary" />
                <span className="font-semibold text-foreground">4.7</span> on Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
