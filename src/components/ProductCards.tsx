import { Check } from "lucide-react";
import usp1 from "@/assets/usp-1.png";
import usp2 from "@/assets/usp-2.png";
import usp3 from "@/assets/usp-3.png";
import usp4 from "@/assets/usp-4.png";
import usp5 from "@/assets/usp-5.png";

const products = [
  {
    name: "Omni CRM",
    tagline: "Guest Intelligence",
    description: "Unified guest profiles powered by real-time behavioral data across every touchpoint.",
    image: usp1,
    features: [
      "360° guest profiles",
      "Predictive engagement scoring",
      "Automated segmentation",
      "Journey mapping",
      "Behavioral triggers",
    ],
    highlight: "3.2x repeat visits",
  },
  {
    name: "Omni Marketing",
    tagline: "Campaign Orchestration",
    description: "AI-driven cross-channel campaigns that convert browsers into loyal guests.",
    image: usp2,
    features: [
      "Cross-channel automation",
      "Dynamic audiences",
      "A/B auto-optimization",
      "Revenue attribution",
      "Smart scheduling",
    ],
    highlight: "2.8x conversion uplift",
  },
  {
    name: "Omni App",
    tagline: "White-Label Platform",
    description: "A fully branded native app that adapts to each guest's journey in real-time.",
    image: usp3,
    features: [
      "Native iOS & Android",
      "Dynamic personalization",
      "Push automation",
      "Offline-capable",
      "Real-time content",
    ],
    highlight: "4.8★ avg rating",
  },
  {
    name: "Omni Membership",
    tagline: "Loyalty & Rewards",
    description: "Tiered membership programs with intelligent reward mechanics and deep analytics.",
    image: usp4,
    features: [
      "Flexible tier structures",
      "Points & perks engine",
      "Auto tier progression",
      "Member analytics",
      "Exclusive access gates",
    ],
    highlight: "156% spend uplift",
  },
  {
    name: "Omni Channels",
    tagline: "Intelligent Messaging",
    description: "AI-optimized communication across email, push, SMS, and in-app — at scale.",
    image: usp5,
    features: [
      "AI message optimization",
      "Smart channel selection",
      "Multi-language generation",
      "Performance analytics",
      "Real-time delivery",
    ],
    highlight: "94% delivery rate",
  },
];

const ProductCards = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          The Full Stack
        </p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Five products. One platform.
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.name}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                  {product.highlight}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {product.tagline}
              </p>
              <h4 className="mb-2 text-lg font-bold text-foreground">
                {product.name}
              </h4>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Features */}
              <ul className="mt-auto space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-secondary"
                  >
                    <Check size={12} className="flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
