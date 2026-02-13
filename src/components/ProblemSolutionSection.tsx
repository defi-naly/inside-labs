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
          <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_160px_160px] items-center border-b border-border/40 px-6 py-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Feature
            </div>
            <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Traditional
            </div>
            <div className="text-center text-xs font-semibold uppercase tracking-wider text-primary">
              Inside Labs
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_160px_160px] items-center px-6 py-3.5 transition-all duration-500 border-b border-border/10 last:border-b-0",
                "hover:bg-card/40",
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-sm text-foreground/90">{row.feature}</span>

              {/* Traditional */}
              <div className="flex justify-center">
                {row.traditional === false ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/30">
                    <X size={12} className="text-muted-foreground/60" />
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground/70 font-medium">{row.traditional}</span>
                )}
              </div>

              {/* Inside Labs */}
              <div className="flex justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 border border-primary/20">
                  <Check size={12} className="text-primary" />
                </div>
              </div>
            </div>
          ))}
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
