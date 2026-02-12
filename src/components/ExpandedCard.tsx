import { useEffect, useRef } from "react";
import { X, ArrowRight, TrendingUp, BarChart3, Users, Zap } from "lucide-react";
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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/20 bg-card shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm transition-colors hover:bg-muted"
        >
          <X size={16} className="text-foreground" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Left: Text content */}
          <div className="p-8 md:p-12">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {data.headline}
            </h2>
            <p className="mb-4 text-base text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
            <p className="mb-6 text-sm text-muted-foreground/80 leading-relaxed">
              {data.description}
            </p>

            {/* Bullets */}
            <ul className="mb-8 space-y-2.5">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span
                    className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/omni-suite"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: data.accentColor }}
              >
                Explore Feature <ArrowRight size={14} />
              </a>
              <a
                href="/omni-suite"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See details
              </a>
            </div>
          </div>

          {/* Right: Stats & Charts */}
          <div className="border-t border-border/30 p-8 md:border-l md:border-t-0 md:p-12">
            {/* Image */}
            <div
              className="mb-8 overflow-hidden rounded-xl p-6"
              style={{
                background: `linear-gradient(145deg, ${data.accentColor}10, ${data.accentColor}05)`,
              }}
            >
              <img
                src={data.image}
                alt={data.headline}
                className="mx-auto h-auto w-full max-w-[280px] object-contain"
              />
            </div>

            {/* Stats grid */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              {data.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className={cn(
                      "text-2xl font-bold tracking-tight md:text-3xl",
                      stat.highlight ? "text-foreground" : "text-foreground"
                    )}
                    style={stat.highlight ? { color: data.accentColor } : {}}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="rounded-xl border border-border/30 bg-muted/30 p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-foreground">
                <BarChart3 size={14} />
                Performance Overview
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {data.chartBars.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-500"
                    style={{
                      height: `${height}%`,
                      backgroundColor: i === data.chartBars.length - 1 || i === data.chartBars.length - 2
                        ? data.accentColor
                        : `${data.accentColor}30`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
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