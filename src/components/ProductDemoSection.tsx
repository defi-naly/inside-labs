import { Compass, Radio, ShoppingBag, Gamepad2, Wallet, Star, Download, Users, Award, ChevronRight, Utensils, Map, Mountain, CloudSun, Ticket, Trophy, Medal, CreditCard, Bell, Bike, Timer, Gift } from "lucide-react";
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

// Clean image frame — no phone outline, just a rounded container
const ImageFrame = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/30">
        {/* Use first image to set natural size */}
        <img
          src={pillarsData[0].screenImage}
          alt="size reference"
          className="w-full h-auto invisible"
        />
        {/* Screenshots with crossfade */}
        {pillarsData.map((p, i) => (
          <img
            key={p.label}
            src={p.screenImage}
            alt={`${p.label} screen`}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
};

const ProductDemoSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
    setExpandedIndex(expandedIndex === i ? null : i);
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

        {/* Main layout: phone + interactive pillars */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          {/* SVG Phone — left */}
          <div
            className="flex justify-center transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
              transitionDelay: "200ms",
            }}
          >
            <ImageFrame activeIndex={activeIndex} />
          </div>

          {/* Interactive pillars — right */}
          <div className="space-y-3">
            {pillarsData.map((p, i) => {
              const Icon = p.icon;
              const isExpanded = expandedIndex === i;
              const isActive = activeIndex === i;

              return (
                <div
                  key={p.label}
                  className={cn(
                    "rounded-xl border transition-all duration-500 overflow-hidden cursor-pointer",
                    isActive
                      ? "border-primary/30 bg-card/60"
                      : "border-border/40 bg-card/20 hover:border-border/60 hover:bg-card/40"
                  )}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(24px)",
                    transitionDelay: `${300 + i * 80}ms`,
                  }}
                  onClick={() => handlePillarClick(i)}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                        isActive
                          ? "border-primary/30 bg-primary/10"
                          : "border-border bg-card"
                      )}
                    >
                      <Icon size={15} className={isActive ? "text-primary" : "text-muted-foreground"} />
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-semibold mb-0.5 transition-colors",
                        isActive ? "text-foreground" : "text-foreground/80"
                      )}>
                        {p.label}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "text-muted-foreground transition-transform duration-300 shrink-0",
                        isExpanded && "rotate-90 text-primary"
                      )}
                    />
                  </div>

                  {/* Expanded feature list */}
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isExpanded ? `${p.features.length * 52 + 40}px` : "0px",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-4 space-y-1.5 border-t border-border/20 pt-3">
                      {p.features.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-start gap-3 rounded-lg bg-card/40 px-4 py-2.5"
                        >
                          <f.icon size={14} className="text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80 leading-relaxed">{f.text}</span>
                        </div>
                      ))}
                    </div>
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
