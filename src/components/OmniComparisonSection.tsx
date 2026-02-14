import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Zap, Smartphone, Trophy } from "lucide-react";
import { useTranslation } from "@/i18n";

/* ─── Product Config (non-translatable parts) ─── */

const productConfig = [
  {
    icon: Zap,
    image: "/images/usp/commerce-screen-m.jpg",
    imagePosition: "object-top",
    isHero: false,
  },
  {
    icon: Smartphone,
    image: "/images/usp/app-3screens-m.jpg",
    imagePosition: "object-top",
    isHero: true,
  },
  {
    icon: Trophy,
    image: "/images/usp/membership-overview.png",
    imagePosition: "object-top",
    isHero: false,
  },
];

/* ─── Feature Comparison Strip ─── */

const FeatureComparisonStrip = ({ visible, t }: { visible: boolean; t: (key: string) => string }) => {
  const featureNames = [0, 1, 2, 3, 4].map(i => t(`omniComparison.features[${i}]`));
  const featureChecks = [
    { engage: true, explore: true, endeavour: true },
    { engage: false, explore: true, endeavour: true },
    { engage: false, explore: true, endeavour: true },
    { engage: false, explore: false, endeavour: true },
    { engage: false, explore: false, endeavour: true },
  ];

  return (
    <div
      className={cn(
        "mb-12 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[500px] rounded-xl border border-border/30 bg-black/20 backdrop-blur-sm">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-0 border-b border-border/20 px-5 py-3">
            <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">{t("omniComparison.featureHeader")}</span>
            <span className="text-xs font-semibold text-muted-foreground text-center">Engage</span>
            <span className="text-xs font-semibold text-primary text-center">Explore</span>
            <span className="text-xs font-semibold text-muted-foreground text-center">Endeavour</span>
          </div>

          {/* Feature rows */}
          {featureNames.map((name, i) => (
            <div
              key={name}
              className={cn(
                "grid grid-cols-4 gap-0 px-5 py-2.5",
                i < featureNames.length - 1 && "border-b border-border/10"
              )}
            >
              <span className="text-sm text-foreground/80">{name}</span>
              <div className="flex justify-center">
                {featureChecks[i].engage ? (
                  <Check size={14} className="text-primary" />
                ) : (
                  <span className="text-muted-foreground/30">&mdash;</span>
                )}
              </div>
              <div className="flex justify-center">
                {featureChecks[i].explore ? (
                  <Check size={14} className="text-primary" />
                ) : (
                  <span className="text-muted-foreground/30">&mdash;</span>
                )}
              </div>
              <div className="flex justify-center">
                {featureChecks[i].endeavour ? (
                  <Check size={14} className="text-primary" />
                ) : (
                  <span className="text-muted-foreground/30">&mdash;</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Product Card ─── */

const ProductCard = ({
  config,
  index,
  visible,
  t,
}: {
  config: (typeof productConfig)[number];
  index: number;
  visible: boolean;
  t: (key: string) => string;
}) => {
  const Icon = config.icon;
  const staggerDelay = [150, 300, 450][index];

  const name = t(`omniComparison.products[${index}].name`);
  const tier = t(`omniComparison.products[${index}].tier`);
  const tagline = t(`omniComparison.products[${index}].tagline`);
  const description = t(`omniComparison.products[${index}].description`);
  const badge = t(`omniComparison.products[${index}].badge`);
  const includes = t(`omniComparison.products[${index}].includes`);
  // Get features — try up to 6
  const features: string[] = [];
  for (let i = 0; i < 6; i++) {
    const f = t(`omniComparison.products[${index}].features[${i}]`);
    if (f !== `omniComparison.products[${index}].features[${i}]`) features.push(f);
  }
  const hasBadge = badge !== `omniComparison.products[${index}].badge`;
  const hasIncludes = includes !== `omniComparison.products[${index}].includes`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all duration-700 flex flex-col hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        config.isHero
          ? "border-primary/40 ring-1 ring-primary/20 shadow-lg shadow-primary/10 md:-translate-y-4"
          : "border-border/40",
        config.isHero && visible && "md:opacity-100 md:translate-y-0 md:-translate-y-4"
      )}
      style={{
        background: "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(230 20% 4%) 100%)",
        transitionDelay: `${staggerDelay}ms`,
      }}
    >
      {/* Hero card persistent glow */}
      {config.isHero && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(355 85% 50% / 0.15), transparent 60%)" }}
        />
      )}

      {/* Mountain header image */}
      <div className={cn("relative w-full overflow-hidden", config.isHero ? "h-56 lg:h-64" : "h-44")}>
        <img
          src={config.image}
          alt={name}
          loading="lazy"
          className={cn("h-full w-full object-cover", config.imagePosition)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div
          className={cn(
            "absolute inset-0 mix-blend-overlay",
            config.isHero ? "opacity-[0.12]" : "opacity-[0.06]"
          )}
          style={{
            background: "radial-gradient(ellipse at 50% 50%, hsl(355 85% 50%), transparent 70%)",
          }}
        />
        {hasBadge && (
          <span className="absolute top-4 right-4 z-10 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25">
            {badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="relative z-10 p-8 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {tier}
        </span>

        <div className="mt-3 flex items-center gap-2.5">
          <Icon size={20} className="text-primary shrink-0" />
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>

        {hasIncludes && (
          <p className="mt-4 text-xs font-medium text-primary/80">{includes}</p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80">{description}</p>

        <div className="my-6 h-px bg-border/40" />

        <ul className="space-y-3 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
              <Check size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 h-px bg-border/40" />

        <a
          href="/demo"
          className={cn(
            "group mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
            config.isHero
              ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
              : "border border-border text-foreground hover:border-primary/30"
          )}
        >
          {t("omniComparison.requestDemo")}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>

        <p className="mt-3 text-[10px] text-muted-foreground/40 text-center">
          {t("omniComparison.trustedBy")}
        </p>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */

const OmniComparisonSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="relative mx-auto max-w-7xl">
        {/* Ambient crimson glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(ellipse, hsl(355 85% 50%), transparent 70%)" }}
        />

        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("omniComparison.eyebrow")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("omniComparison.headline")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {t("omniComparison.subtitle")}
          </p>
        </div>

        {/* Feature comparison strip */}
        <FeatureComparisonStrip visible={visible} t={t} />

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr_1fr] gap-6 items-start">
          {productConfig.map((config, i) => (
            <ProductCard key={i} config={config} index={i} visible={visible} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OmniComparisonSection;
