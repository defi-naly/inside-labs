import { useRef, useEffect, useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";
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
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Why Inside Labs
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl mb-4">
            The unfair advantage.
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground leading-relaxed">
            See how destinations powered by Inside Labs compare to those
            relying on traditional, disconnected tools.
          </p>
        </div>

        {/* Comparison table */}
        <div
          className="rounded-2xl border border-border/60 overflow-hidden"
          style={{
            background: "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 100%)",
          }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_150px_180px] items-end border-b border-border/40 px-6 py-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Capability
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Traditional
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Inside Labs
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_150px_180px] items-center px-6 py-3.5 transition-all duration-500 border-b border-border/[0.06] last:border-b-0",
                "hover:bg-primary/[0.02]",
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-sm text-foreground/80">{row.feature}</span>

              {/* Traditional */}
              <div className="flex justify-center">
                {row.traditional === false ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/20 border border-border/30">
                    <X size={11} className="text-muted-foreground/40" />
                  </div>
                ) : (
                  <span className="inline-flex rounded-full bg-muted/15 border border-border/20 px-2.5 py-0.5 text-[10px] text-muted-foreground/50 font-medium">
                    {row.traditional}
                  </span>
                )}
              </div>

              {/* Inside Labs — highlighted column */}
              <div className="flex justify-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 border border-primary/30 shadow-sm shadow-primary/10">
                  <Check size={14} className="text-primary" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}

          {/* Summary footer */}
          <div className="grid grid-cols-[1fr_110px_130px] md:grid-cols-[1fr_150px_180px] items-center border-t border-border/30 px-6 py-4 bg-primary/[0.03]">
            <span className="text-xs font-semibold text-foreground/70">Score</span>
            <div className="text-center">
              <span className="text-lg font-bold text-muted-foreground/40">0/10</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-primary">10/10</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-10 transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "700ms",
          }}
        >
          <a
            href="/product"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            See the full platform
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
