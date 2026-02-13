import { useEffect, useRef } from "react";
import { X, ArrowRight, BarChart3, TrendingUp, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

interface BulletPoint {
  text: string;
}

interface ExpandedCardData {
  headline: string;
  subtitle: string;
  description: string;
  stats: StatItem[];
  bullets: BulletPoint[];
  chartBars: number[];
  image: string;
  accentColor: string;
}

interface ExpandedCardProps {
  data: ExpandedCardData;
  onClose: () => void;
}

const ExpandedCard = ({ data, onClose }: ExpandedCardProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Generate sparkline path from chart bars
  const sparklinePath = data.chartBars
    .map((v, i) => {
      const x = (i / (data.chartBars.length - 1)) * 100;
      const y = 100 - v;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const sparklineAreaPath = sparklinePath + ` L 100 100 L 0 100 Z`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        style={{
          background: "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 50%, hsl(230 15% 5%) 100%)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-black/40 backdrop-blur-md transition-colors hover:border-primary/40"
        >
          <X size={16} className="text-foreground" />
        </button>

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="grid gap-0 lg:grid-cols-5">
          {/* Left panel — content (2 cols) */}
          <div className="lg:col-span-2 p-8 md:p-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary mb-5">
              <Zap size={10} />
              Feature
            </div>

            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl leading-tight">
              {data.headline}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
            <p className="mb-8 text-xs text-muted-foreground/70 leading-relaxed">
              {data.description}
            </p>

            {/* Bullets */}
            <ul className="mb-8 space-y-3">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="hsl(355 85% 50%)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/omni-suite"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Explore Feature <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right panel — dashboard (3 cols) */}
          <div className="lg:col-span-3 border-t border-border/20 lg:border-l lg:border-t-0 p-8 md:p-10">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {data.stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/40 bg-black/30 px-4 py-4 text-center backdrop-blur-sm"
                >
                  <div
                    className={cn(
                      "text-2xl font-bold tracking-tight md:text-3xl",
                      stat.highlight ? "text-primary" : "text-foreground"
                    )}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart — area sparkline */}
            <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Activity size={14} className="text-primary" />
                  Performance Trend
                </div>
                <div className="flex items-center gap-1 text-[10px] text-primary font-medium">
                  <TrendingUp size={10} />
                  +{data.chartBars[data.chartBars.length - 1] - data.chartBars[0]}%
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${data.headline.slice(0, 5)}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(355 85% 50%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(355 85% 50%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={sparklineAreaPath} fill={`url(#gradient-${data.headline.slice(0, 5)})`} />
                <path d={sparklinePath} fill="none" stroke="hsl(355 85% 50%)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground/60">
                <span>Jan</span>
                <span>Mar</span>
                <span>Jun</span>
                <span>Sep</span>
                <span>Dec</span>
              </div>
            </div>

            {/* Mini bar chart */}
            <div className="rounded-xl border border-border/30 bg-black/20 p-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
                <BarChart3 size={14} className="text-primary" />
                Monthly Breakdown
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {data.chartBars.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-700"
                    style={{
                      height: `${height}%`,
                      background:
                        i >= data.chartBars.length - 2
                          ? "linear-gradient(to top, hsl(355 78% 40%), hsl(355 78% 56%))"
                          : "hsl(355 78% 56% / 0.12)",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground/60">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;
