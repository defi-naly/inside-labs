import { Compass, Radio, ShoppingBag, Gamepad2, Wallet, Star, Download, Users, Award, Utensils, Map, Mountain, CloudSun, Ticket, Trophy, Medal, CreditCard, Bell, Bike, Timer, Gift } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Full feature data from insidelabs.tech/en/omni-app
const pillarsData = [
  {
    icon: Compass,
    label: "For You",
    desc: "All the information you need to plan your adventure.",
    screenColor: "hsl(355 85% 50%)",
    screenImage: "https://insidelabs.tech/images/2020/omni/theapp-explore/m.jpg",
    features: [
      { icon: Bell, text: "Destination announcements (dashboard & push alerts)" },
      { icon: Utensils, text: "Gastro info, menus, opening times & bookables" },
      { icon: Map, text: "Curated content — activity & full day guides" },
      { icon: Bike, text: "Hiking & biking trails" },
      { icon: Timer, text: "News & Events" },
      { icon: Ticket, text: "Digital guestcard with promotions and special offers" },
      { icon: Map, text: "Live point-to-point train/bus timetables" },
    ],
  },
  {
    icon: Radio,
    label: "Live",
    desc: "Real-time data & periodic updates of resort operations & conditions.",
    screenImage: "https://insidelabs.tech/images/2020/omni/theapp-live/m.jpg",
    screenColor: "hsl(200 80% 50%)",
    features: [
      { icon: CloudSun, text: "Webcams, weather and snow reports" },
      { icon: Mountain, text: "Lift operation status" },
      { icon: Map, text: "Map-based slope status (winter) and trail status (summer)" },
      { icon: Utensils, text: "Facility status (Restaurants, cafes, lakes etc)" },
      { icon: Mountain, text: "Mountain safety functions" },
    ],
  },
  {
    icon: ShoppingBag,
    label: "Shop",
    desc: "A powerful mobile storefront — browse, book, and buy in a few taps.",
    screenImage: "https://insidelabs.tech/images/2020/omni/theapp-shop/m.jpg",
    screenColor: "hsl(30 90% 50%)",
    features: [
      { icon: Ticket, text: "Lift tickets, equipment rentals and parking passes" },
      { icon: Map, text: "Experiences, adventure packages, guided tours" },
      { icon: Ticket, text: "Bus & shuttle tickets" },
      { icon: Gift, text: "Rewards redemptions & exclusive offers" },
      { icon: Utensils, text: "Food & Beverage ordering and dine-in reservations" },
      { icon: ShoppingBag, text: "Branded merchandise & event tickets" },
    ],
  },
  {
    icon: Gamepad2,
    label: "Play",
    desc: "Gamification and community features that keep guests engaged.",
    screenImage: "https://insidelabs.tech/images/2020/omni/theapp-play/m.jpg",
    screenColor: "hsl(280 70% 55%)",
    features: [
      { icon: Timer, text: "My Story — season, daily recaps & performance tracking" },
      { icon: Trophy, text: "Leaderboards — real time, weekly, seasonal rankings" },
      { icon: Map, text: "Challenges & GEO-based activities" },
      { icon: Users, text: "Friends & destination community features" },
      { icon: Medal, text: "Rewards & achievements, badge earning functionality" },
    ],
  },
  {
    icon: Wallet,
    label: "Wallet",
    desc: "Manage tickets, guestcards, payments and loyalty — all in one place.",
    screenImage: "https://insidelabs.tech/images/2020/omni/theapp-me/m.jpg",
    screenColor: "hsl(160 60% 45%)",
    features: [
      { icon: Ticket, text: "Upcoming tickets — railway, admission, guestcard offers all in one place" },
      { icon: CreditCard, text: "Digital guest cards for overnight guests and memberships" },
      { icon: Gift, text: "Management of vouchers & coupons" },
      { icon: CreditCard, text: "Credit cards & payment methods management" },
      { icon: Star, text: "Loyalty program — points balance & redemption tracking" },
    ],
  },
];

const stats = [
  { icon: Star, value: "4.9", label: "App Store Rating", suffix: "★" },
  { icon: Download, value: "200k+", label: "Downloads" },
  { icon: Users, value: "62%", label: "Adoption Rate" },
  { icon: Award, value: "#1", label: "Tourism App CH" },
];

// Themed phone frame
const ImageFrame = ({ activeIndex }: { activeIndex: number }) => {
  const pillar = pillarsData[activeIndex];

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Outer glow */}
      <div
        className="absolute -inset-6 rounded-[3rem] opacity-25 blur-3xl transition-colors duration-500"
        style={{ background: `radial-gradient(ellipse at center, ${pillar.screenColor}30, transparent 70%)` }}
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
            {pillarsData.map((p, i) => (
              <img
                key={p.label}
                src={p.screenImage}
                alt={`${p.label} screen`}
                className="absolute inset-0 w-full h-full object-cover object-left transition-opacity duration-500"
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

  const handlePillarClick = (i: number) => {
    setActiveIndex(i);
  };

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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-3xl mx-auto transition-all duration-700"
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

        {/* Side-by-side: phone left, info right */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Phone — left */}
          <div
            className="flex justify-start transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: "200ms",
            }}
          >
            <ImageFrame activeIndex={activeIndex} />
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
            {/* Pillar tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {pillarsData.map((p, i) => {
                const Icon = p.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={p.label}
                    onClick={() => handlePillarClick(i)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer",
                      isActive
                        ? "border-primary/40 bg-primary/10 text-foreground"
                        : "border-border/40 bg-card/20 text-muted-foreground hover:border-border/60 hover:bg-card/40"
                    )}
                  >
                    <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Active pillar description */}
            <div className="mb-6">
              <p className="text-xl font-semibold text-foreground mb-2">{pillarsData[activeIndex].label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillarsData[activeIndex].desc}</p>
            </div>

            {/* Feature list */}
            <div className="space-y-2 mb-8">
              {pillarsData[activeIndex].features.map((f, fi) => (
                <div
                  key={fi}
                  className="flex items-start gap-3 rounded-xl border border-border/30 bg-card/30 px-4 py-3 transition-all duration-300"
                >
                  <f.icon size={14} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 leading-relaxed">{f.text}</span>
                </div>
              ))}
            </div>

            {/* App store badges */}
            <div className="flex items-center gap-3">
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
