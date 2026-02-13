import { useEffect, useRef } from "react";
import { X, Zap, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboards } from "@/components/ExpandedCard";
import type { CaseStudy } from "@/data/caseStudies";
import { useTranslation } from "@/i18n";

interface ImpactDetailModalProps {
  study: CaseStudy;
  onClose: () => void;
}

const ImpactDetailModal = ({ study, onClose }: ImpactDetailModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const Dashboard = study.dashboardType != null ? dashboards[study.dashboardType] : null;
  const { t } = useTranslation();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const category = t(`caseStudies.${study.id}.category`);
  const story = t(`caseStudies.${study.id}.story`);
  const quote = t(`caseStudies.${study.id}.quote`);
  const bullets = study.bullets.map((_, i) => t(`caseStudies.${study.id}.bullets[${i}]`));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />

      <div
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        style={{
          background:
            "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 50%, hsl(230 15% 5%) 100%)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-black/40 backdrop-blur-md transition-colors hover:border-primary/40"
        >
          <X size={16} className="text-foreground" />
        </button>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="grid gap-0 lg:grid-cols-5">
          {/* Left — content */}
          <div className="lg:col-span-2 p-8 md:p-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary mb-5">
              <Zap size={10} />
              {category}
            </div>

            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl leading-tight">
              {study.name}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              {study.fullName}
            </p>

            <p className="mb-8 text-sm text-muted-foreground/80 leading-relaxed">
              {story}
            </p>

            <ul className="mb-8 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3.2 5.7L6.5 2.3"
                        stroke="hsl(355 85% 50%)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="relative rounded-xl border border-primary/10 bg-primary/[0.03] p-5">
              <Quote size={20} className="text-primary/30 mb-3" />
              <p className="text-sm italic text-foreground/80 leading-relaxed mb-3">
                &ldquo;{quote}&rdquo;
              </p>
              <footer className="text-xs text-muted-foreground font-medium">
                — {study.quote.author},{" "}
                <span className="text-muted-foreground/60">{study.quote.role}</span>
              </footer>
            </div>
          </div>

          {/* Right — media hero + stats + dashboard */}
          <div className="lg:col-span-3 border-t border-border/20 lg:border-l lg:border-t-0 p-8 md:p-10">
            {/* Top media: video if no screens image, otherwise app screens */}
            {!study.gridScreensImage && study.videoUrl && study.videoType === "youtube" ? (
              <div className="rounded-xl overflow-hidden mb-6 border border-border/20 aspect-video">
                <iframe
                  src={study.videoUrl}
                  title={`${study.name} video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : !study.gridScreensImage && study.videoUrl && study.videoType === "local" ? (
              <div className="rounded-xl overflow-hidden mb-6 border border-border/20">
                <video
                  src={study.videoUrl}
                  className="w-full"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden mb-6 border border-border/20">
                <img
                  src={study.gridScreensImage || study.heroImage}
                  alt={`${study.name} app`}
                  className="w-full h-56 md:h-64 object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mb-6">
              {study.stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/40 bg-black/30 px-4 py-4 text-center backdrop-blur-sm"
                >
                  <div
                    className={cn(
                      "text-2xl font-bold tracking-tight md:text-3xl",
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

            {Dashboard && <Dashboard bars={[65, 78, 52, 88, 71, 45, 92, 60, 83, 70]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDetailModal;
