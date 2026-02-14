import { Check, ArrowRight, Zap, Smartphone, Trophy } from "lucide-react";
const products = [
  {
    name: "Omni Engage",
    tagline: "Activate · Monetize · Retain",
    icon: Zap,
    description:
      "Start a personalized dialogue with your guests across marketing channels based on your e-commerce data. Deploy from 20+ proven campaigns.",
    image: "/images/usp/commerce-screen-m.jpg",
    features: [
      "20+ proven campaign templates",
      "E-commerce data activation",
      "Dynamic booking engine messaging",
      "Segment creation & tracking",
      "Data-driven decision insights",
    ],
    tier: "Foundation",
  },
  {
    name: "Omni Explore",
    tagline: "Experience · Personalize · Connect",
    icon: Smartphone,
    description:
      "Everything in Engage, plus an award-winning white-label app, digital memberships, and advanced personalization AI at scale.",
    image: "/images/usp/app-3screens-m.jpg",
    includes: "Omni Engage",
    features: [
      "White-label iOS & Android app",
      "Multi-channel automation (email, push, SMS, WhatsApp)",
      "Personalized mobile experience",
      "Native e-commerce catalog",
      "Membership programs",
      "500+ data point cross-selling",
    ],
    tier: "Professional",
    highlighted: true,
    appBadge: "Featuring the Omni App",
  },
  {
    name: "Omni Endeavor",
    tagline: "Loyalty · Gamification · Intelligence",
    icon: Trophy,
    description:
      "The most advanced engagement platform in travel. Limitless data streaming, sophisticated loyalty programs, and gamification experiences.",
    image: "/images/usp/membership-overview.png",
    includes: "Omni Explore",
    features: [
      "All Omni Explore features",
      "Advanced loyalty programs",
      "Gamification mechanics",
      "Limitless data streaming",
      "Custom system integrations",
      "Personalized challenges & rewards",
    ],
    tier: "Enterprise",
    appNote: "Powered by the Omni App",
  },
];

const ProductCards = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          The Omni Suite
        </p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Three tiers. One platform.
        </h3>
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {products.map((product) => {
          const Icon = product.icon;
          const isHero = product.highlighted;

          return (
            <div
              key={product.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                isHero
                  ? "border-primary/40 shadow-md shadow-primary/10 md:-my-4 md:z-10"
                  : "border-border hover:border-primary/20 hover:shadow-primary/5"
              }`}
              style={{
                background: isHero
                  ? "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(355 40% 8%) 40%, hsl(230 15% 5%) 100%)"
                  : "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 4%) 50%, hsl(230 15% 5%) 100%)",
              }}
            >
              {/* Gradient mesh overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  background: isHero
                    ? "radial-gradient(ellipse at 70% 0%, hsl(355 85% 40% / 0.3), transparent 60%)"
                    : "radial-gradient(ellipse at 70% 0%, hsl(230 30% 20% / 0.4), transparent 60%)",
                }}
              />

              {isHero && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className={`relative overflow-hidden ${isHero ? "h-56" : "h-44"}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70 ${
                    isHero ? "opacity-60" : "opacity-50"
                  }`}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(230 15% 5%), hsl(230 15% 5% / 0.7), transparent)",
                  }}
                />

                {/* App badge for hero */}
                {product.appBadge && (
                  <div className="absolute bottom-3 left-5 z-10 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 backdrop-blur-sm">
                    <Smartphone size={12} className="text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      {product.appBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                  {product.tier}
                </p>
                <div className="mb-1 flex items-center gap-2">
                  <Icon size={20} className="flex-shrink-0 text-primary" />
                  <h4 className="text-2xl font-bold text-foreground">
                    {product.name}
                  </h4>
                </div>
                <p className="mb-4 text-xs font-medium text-muted-foreground">
                  {product.tagline}
                </p>
                {product.includes && (
                  <p className="mb-3 text-xs text-muted-foreground">
                    Includes everything in{" "}
                    <span className="font-semibold text-foreground">
                      {product.includes}
                    </span>
                  </p>
                )}
                <p className="mb-6 text-sm leading-relaxed text-secondary">
                  {product.description}
                </p>

                {/* App note for Endeavor */}
                {product.appNote && (
                  <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Smartphone size={12} className="text-primary/60" />
                    <span>{product.appNote}</span>
                  </div>
                )}

                {/* Features */}
                <ul className="mt-auto space-y-2.5 border-t border-border pt-5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-secondary"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 flex-shrink-0 text-primary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/demo"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isHero
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                      : "border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  Request Demo
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCards;
