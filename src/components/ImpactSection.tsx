import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import ImpactDetailModal from "@/components/ImpactDetailModal";
import { useTranslation } from "@/i18n";

const aggregateStatValues = ["800k+", "6", "CHF 19M+", "4+★"];

const ImpactSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

  const selectedStudy = caseStudies.find((s) => s.id === selectedId);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Aggregate proof bar */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          {aggregateStatValues.map((value, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-black/20 backdrop-blur-sm px-6 py-5 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                {t(`impact.stats[${i}].label`)}
              </div>
            </div>
          ))}
        </div>

        {/* Case study cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={i}
              visible={visible}
              onClick={() => setSelectedId(study.id)}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selectedStudy && (
        <ImpactDetailModal
          study={selectedStudy}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
};

export default ImpactSection;
