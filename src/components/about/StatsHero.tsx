import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

interface StatConfig {
  target: number;
  suffix: string;
  hero?: boolean;
}

const statsConfig: StatConfig[] = [
  { target: 139, suffix: "" },
  { target: 300000, suffix: "+", hero: true },
  { target: 30, suffix: "M+" },
];

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);

  const animate = useCallback(() => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (trigger) animate();
  }, [trigger, animate]);

  return value;
}

const StatBlock = ({ stat, trigger, label }: { stat: StatConfig; trigger: boolean; label: string }) => {
  const value = useCountUp(stat.target, 2000, trigger);
  const formatted =
    stat.target >= 1000
      ? new Intl.NumberFormat("en-US").format(value)
      : String(value);

  return (
    <div className="text-center">
      {stat.hero && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(355 85% 40% / 0.06), transparent 70%)",
          }}
        />
      )}
      <div className="relative">
        {stat.target === 30 && (
          <span className="text-5xl md:text-7xl font-bold text-red-500 tabular-nums">
            $
          </span>
        )}
        <span className={cn("text-5xl md:text-7xl font-bold tabular-nums", stat.target === 30 ? "text-red-500" : "text-foreground")}>
          {formatted}
        </span>
        <span className={cn("text-5xl md:text-7xl font-bold", stat.target === 30 ? "text-red-500" : "text-foreground")}>
          {stat.suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const StatsHero = () => {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6">
      <div
        className={cn(
          "mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        {statsConfig.map((stat, i) => (
          <div key={i} className="relative">
            <StatBlock stat={stat} trigger={visible} label={t(`statsHero[${i}].label`)} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsHero;
