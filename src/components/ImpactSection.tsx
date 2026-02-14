import { useRef, useEffect, useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import ImpactDetailModal from "@/components/ImpactDetailModal";

const ImpactSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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
