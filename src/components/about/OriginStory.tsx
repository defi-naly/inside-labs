import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n";

const milestoneYears = ["2014–15", "2016", "2017", "2018–19", "2020–Today"];

const OriginStory = () => {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 border-t border-border/40">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-16">
          <span
            className={cn(
              "inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {t("originStory.eyebrow")}
          </span>
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700 mb-5",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            {t("originStory.headline")}
          </h2>
          <p
            className={cn(
              "text-base text-muted-foreground leading-relaxed transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            {t("originStory.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-primary/20" />

          <div className="space-y-10">
            {milestoneYears.map((year, i) => (
              <div
                key={year}
                className={cn(
                  "relative transition-all duration-700",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="absolute -left-8 top-1 h-3 w-3 rounded-full bg-primary" />

                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-2">
                  {year}
                </span>

                <h3 className="text-lg font-bold text-foreground mb-1">
                  {t(`originStory.milestones[${i}].title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`originStory.milestones[${i}].description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Read more link */}
        <div
          className={cn(
            "mt-12 transition-all duration-700",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "1100ms" }}
        >
          <a
            href="https://medium.com/inside-labs-stories/the-story-of-our-snow-bum-company-inside-labs-313d1b6264f5"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
          >
            {t("originStory.readMore")}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
