import { useRef, useEffect, useState } from "react";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const rows = [
  { feature: "Unified guest profiles", traditional: false, insideLabs: true },
  { feature: "Cross-channel campaign automation", traditional: false, insideLabs: true },
  { feature: "Real-time behavioral triggers", traditional: false, insideLabs: true },
  { feature: "White-label native app", traditional: false, insideLabs: true },
  { feature: "AI-powered personalization", traditional: false, insideLabs: true },
  { feature: "Membership & loyalty programs", traditional: false, insideLabs: true },
  { feature: "E-commerce integration", traditional: "Basic", insideLabs: true },
  { feature: "Guest data & analytics", traditional: "Fragmented", insideLabs: true },
  { feature: "Multi-language support", traditional: "Manual", insideLabs: true },
  { feature: "Omni-channel messaging", traditional: false, insideLabs: true },
];

const ProblemSolutionSection = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
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
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40 relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(355 85% 50%), transparent 70%)" }}
      />

      <div className="mx-auto max-w-5xl relative">
        {/* Header — bigger, bolder */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Sparkles size={12} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Inside Labs
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl mb-5">
            The unfair advantage.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
            See how destinations powered by Inside Labs compare to those
            relying on traditional, disconnected tools.
          </p>
        </div>

        {/* Comparison table — elevated design */}
        <div
          className={cn(
            "rounded-3xl border border-border/40 overflow-hidden transition-all duration-1000 relative",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{
            background: "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 100%)",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5), 0 0 60px -10px rgba(225,29,72,0.06)",
          }}
        >
          {/* Inside Labs column highlight strip */}
          <div className="absolute top-0 right-0 w-[180px] md:w-[200px] h-full bg-primary/[0.03] pointer-events-none" />

          {/* Table header */}
          <div className="grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_160px_200px] items-end border-b border-border/30 px-8 py-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Capability
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
                Traditional
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary shadow-sm shadow-primary/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Inside Labs
              </div>
            </div>
          </div>

          {/* Rows with staggered reveal */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_160px_200px] items-center px-8 py-4 transition-all duration-500 border-b border-border/[0.06] last:border-b-0 relative",
                hoveredRow === i && "bg-primary/[0.03]",
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              )}
              style={{ transitionDelay: `${150 + i * 70}ms` }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span className={cn(
                "text-sm transition-colors duration-200",
                hoveredRow === i ? "text-foreground" : "text-foreground/70"
              )}>
                {row.feature}
              </span>

              {/* Traditional */}
              <div className="flex justify-center">
                {row.traditional === false ? (
                  <div className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300",
                    hoveredRow === i
                      ? "bg-destructive/10 border-destructive/20"
                      : "bg-muted/10 border-border/20"
                  )}>
                    <X size={12} className={cn(
                      "transition-colors",
                      hoveredRow === i ? "text-destructive/60" : "text-muted-foreground/30"
                    )} />
                  </div>
                ) : (
                  <span className="inline-flex rounded-full bg-muted/10 border border-border/20 px-3 py-0.5 text-[10px] text-muted-foreground/40 font-medium">
                    {row.traditional}
                  </span>
                )}
              </div>

              {/* Inside Labs */}
              <div className="flex justify-center">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
                  hoveredRow === i
                    ? "bg-primary/20 border-primary/40 shadow-lg shadow-primary/20 scale-110"
                    : "bg-primary/10 border-primary/25"
                )}>
                  <Check size={15} className="text-primary" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}

          {/* Summary footer — bold score */}
          <div
            className={cn(
              "grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_160px_200px] items-center border-t border-primary/10 px-8 py-5 transition-all duration-700",
              visible ? "opacity-100" : "opacity-0"
            )}
            style={{
              transitionDelay: "1000ms",
              background: "linear-gradient(90deg, transparent 40%, hsl(355 85% 40% / 0.06) 100%)",
            }}
          >
            <span className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Score</span>
            <div className="text-center">
              <span className="text-2xl font-black text-muted-foreground/25">0<span className="text-sm font-medium">/10</span></span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-primary">10<span className="text-sm font-medium text-primary/70">/10</span></span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-500",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "1100ms" }}
        >
          <a
            href="/product"
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:text-primary/80 hover:gap-3"
          >
            See the full platform
            <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
