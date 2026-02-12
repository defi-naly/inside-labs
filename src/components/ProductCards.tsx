import { Check, ArrowRight } from "lucide-react";
import usp1 from "@/assets/usp-1.png";
import usp3 from "@/assets/usp-3.png";
import usp4 from "@/assets/usp-4.png";

const products = [
  {
    name: "Omni Engage",
    tagline: "Activate · Monetize · Retain",
    description:
      "Start a personalized dialogue with your guests across marketing channels based on your e-commerce data. Deploy from 20+ proven campaigns.",
    image: usp1,
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
    description:
      "Everything in Engage, plus an award-winning white-label app, digital memberships, and advanced personalization AI at scale.",
    image: usp3,
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
  },
  {
    name: "Omni Endeavor",
    tagline: "Loyalty · Gamification · Intelligence",
    description:
      "The most advanced engagement platform in travel. Limitless data streaming, sophisticated loyalty programs, and gamification experiences.",
    image: usp4,
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

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.name}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
              product.highlighted
                ? "border-primary/40 bg-card shadow-md shadow-primary/5"
                : "border-border bg-card hover:border-primary/20 hover:shadow-primary/5"
            }`}
          >
            {product.highlighted && (
              <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Most Popular
              </div>
            )}

            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                {product.tier}
              </p>
              <h4 className="mb-1 text-2xl font-bold text-foreground">
                {product.name}
              </h4>
              <p className="mb-4 text-xs font-medium text-muted-foreground">
                {product.tagline}
              </p>
              {product.includes && (
                <p className="mb-3 text-xs text-muted-foreground">
                  Includes everything in <span className="font-semibold text-foreground">{product.includes}</span>
                </p>
              )}
              <p className="mb-6 text-sm leading-relaxed text-secondary">
                {product.description}
              </p>

              {/* Features */}
              <ul className="mt-auto space-y-2.5 border-t border-border pt-5">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-secondary"
                  >
                    <Check size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  product.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                    : "border border-border text-foreground hover:border-primary/30"
                }`}
              >
                Request Demo
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
