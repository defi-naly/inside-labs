import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/data/caseStudies";
import { useTranslation } from "@/i18n";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  visible: boolean;
  onClick: () => void;
}

const CaseStudyCard = ({ study, index, visible, onClick }: CaseStudyCardProps) => {
  const { t } = useTranslation();
  const category = t(`caseStudies.${study.id}.category`);

  return (
    <div
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        onClick={onClick}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-border/40 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
        style={{
          background: "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(230 20% 4%) 100%)",
        }}
      >
        {/* Hero image with overlay */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img
            src={study.heroImage}
            alt={study.fullName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            {study.logo ? (
              <img
                src={study.logo}
                alt={study.name}
                className="h-10 w-auto shrink-0 object-contain brightness-0 invert"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-sm font-bold text-white">
                  {study.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="ml-auto inline-block rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-medium text-white/90">
              {category}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {study.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            {study.fullName}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {study.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/40 bg-black/20 px-3 py-3 text-center"
              >
                <div
                  className={cn(
                    "text-2xl font-bold tracking-tight",
                    stat.highlight ? "text-primary" : "text-foreground"
                  )}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground leading-tight">
                  {t(`caseStudies.${study.id}.stats[${i}].label`)}
                </div>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-primary/30 pl-4 mb-5">
            <p className="text-sm italic text-foreground/70 leading-relaxed">
              &ldquo;{t(`caseStudies.${study.id}.quote`)}&rdquo;
            </p>
            <footer className="mt-2 text-xs text-muted-foreground">
              — {study.quote.author}, {study.quote.role}
            </footer>
          </blockquote>

          <div className="flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 group-hover:gap-3">
            {t("caseStudyCard.readMore")}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
