import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { useTranslation } from "@/i18n";

const awardYears = ["2017", "2017", "2018", "2020", "2020"];

const AwardsBar = () => {
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
    <div ref={ref} className="py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Desktop: flex-wrap centered */}
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          {awardYears.map((year, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2.5 rounded-full border border-border/30 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.05]",
                visible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Trophy size={14} className="shrink-0 text-primary/70" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-medium whitespace-nowrap">
                {t(`awards[${i}]`)}
              </span>
              <span className="text-[11px] text-muted-foreground/40">{year}</span>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll with fade masks */}
        <div className="md:hidden relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="overflow-x-auto flex flex-nowrap gap-3 pb-2 scrollbar-hide">
            {awardYears.map((year, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border border-border/30 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 shrink-0 transition-all duration-500",
                  visible ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Trophy size={14} className="shrink-0 text-primary/70" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-medium whitespace-nowrap">
                  {t(`awards[${i}]`)}
                </span>
                <span className="text-[11px] text-muted-foreground/40">{year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsBar;
