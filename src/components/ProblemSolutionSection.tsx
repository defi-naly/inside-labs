import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

const rowStats = ["3.2x", "94%", "200k+", "72%", "300%"];

const proofStatValues = ["6", "800k+", "4+ ★"];

function TransformCard({
  index,
  solved,
  pain,
  solution,
  stat,
  statLabel,
  totalRows,
}: {
  index: number;
  solved: boolean;
  pain: string;
  solution: string;
  stat: string;
  statLabel: string;
  totalRows: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasSwept, setHasSwept] = useState(false);
  const [showSweep, setShowSweep] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (solved && !hasSwept && !prefersReducedMotion) {
      setShowSweep(true);
      setHasSwept(true);
      const timer = setTimeout(() => setShowSweep(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [solved, hasSwept, prefersReducedMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all",
        prefersReducedMotion ? "duration-0" : "duration-500",
        solved
          ? "border-primary/20 shadow-lg shadow-primary/5"
          : "border-border/20",
        isHovered && solved && "border-primary/30 shadow-lg shadow-primary/10"
      )}
      style={{
        background: solved ? "hsl(230 15% 6%)" : "hsl(230 20% 3%)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {showSweep && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(355 85% 50% / 0.12) 40%, hsl(355 85% 50% / 0.2) 50%, hsl(355 85% 50% / 0.12) 60%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "sweep-upgrade 1.2s ease-out forwards",
          }}
        />
      )}

      {solved && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.08), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 px-5 py-4 md:px-7 md:py-5">
        <div
          className={cn(
            "flex items-start gap-3 transition-all",
            prefersReducedMotion ? "duration-0" : "duration-500",
            solved ? "opacity-0 absolute -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: solved ? `${index * 80}ms` : `${(totalRows - 1 - index) * 60}ms` }}
        >
          <X size={16} className="mt-0.5 shrink-0 text-red-500/70" strokeWidth={2.5} />
          <p className="text-sm text-muted-foreground/50 leading-relaxed">{pain}</p>
        </div>

        <div
          className={cn(
            "flex flex-col md:flex-row md:items-center gap-3 md:gap-4 transition-all",
            prefersReducedMotion ? "duration-0" : "duration-500",
            solved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 absolute pointer-events-none"
          )}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
            <p className="text-sm text-foreground leading-relaxed">{solution}</p>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1.5 shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 ml-7 md:ml-0 transition-all",
              prefersReducedMotion ? "duration-0" : "duration-500",
              solved ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
            style={{ transitionDelay: `${index * 80 + 200}ms` }}
          >
            <span className="text-sm font-bold text-primary tabular-nums">{stat}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProblemSolutionSection = () => {
  const [visible, setVisible] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 px-6 border-t border-border/40 relative overflow-hidden"
    >
      <style>{`
        @keyframes sweep-upgrade {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0s !important; }
        }
      `}</style>

      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(220 40% 30% / 0.03), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(355 85% 50%), transparent 70%)" }}
      />

      <div className="mx-auto max-w-5xl relative">
        <div className="text-center mb-12 md:mb-16">
          <span
            className={cn(
              "inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {t("problemSolution.eyebrow")}
          </span>
          <h2
            className={cn(
              "text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl mb-5 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            {t("problemSolution.headline")}<br />{t("problemSolution.headlineBr")}
          </h2>
          <p
            className={cn(
              "mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-700",
              visible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            {t("problemSolution.subtitle")}
          </p>
        </div>

        <div
          className={cn(
            "flex items-center justify-center gap-4 mb-8 transition-all duration-500",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
              !upgraded ? "text-muted-foreground" : "text-muted-foreground/30"
            )}
          >
            {t("problemSolution.toggleOff")}
          </span>

          <button
            onClick={() => setUpgraded((u) => !u)}
            className={cn(
              "relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer border",
              upgraded
                ? "bg-primary/20 border-primary/40"
                : "bg-muted/20 border-border/40"
            )}
            aria-label={upgraded ? "Switch to traditional view" : "Switch to upgraded view"}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full transition-opacity duration-500",
                upgraded ? "opacity-100" : "opacity-0"
              )}
              style={{
                background: "radial-gradient(ellipse at 70% 50%, hsl(355 85% 50% / 0.15), transparent 70%)",
              }}
            />
            <div
              className={cn(
                "absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 shadow-md",
                upgraded
                  ? "left-[calc(100%-1.625rem)] bg-primary shadow-primary/30"
                  : "left-0.5 bg-muted-foreground/50"
              )}
            />
          </button>

          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
              upgraded ? "text-primary" : "text-muted-foreground/30"
            )}
          >
            {t("problemSolution.toggleOn")}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {rowStats.map((stat, i) => (
            <TransformCard
              key={i}
              index={i}
              solved={upgraded}
              pain={t(`problemSolution.rows[${i}].pain`)}
              solution={t(`problemSolution.rows[${i}].solution`)}
              stat={stat}
              statLabel={t(`problemSolution.rows[${i}].statLabel`)}
              totalRows={rowStats.length}
            />
          ))}
        </div>

        <div
          className={cn(
            "mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 transition-all duration-700",
            upgraded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
          style={{ transitionDelay: upgraded ? "500ms" : "0ms" }}
        >
          {proofStatValues.map((value, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-black/20 backdrop-blur-sm px-5 py-4 text-center"
            >
              <div className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                {value}
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
                {t(`problemSolution.proofStats[${i}].label`)}
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "text-center mt-10 transition-all duration-500",
            upgraded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: upgraded ? "700ms" : "0ms" }}
        >
          <a
            href="/product"
            className="group/cta inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:gap-3"
          >
            {t("problemSolution.cta")}
            <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
