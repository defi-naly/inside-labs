import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/data/caseStudies";

interface ImpactRowProps {
  study: CaseStudy;
  index: number;
  visible: boolean;
  onClick: () => void;
}

const ImpactRow = ({ study, index, visible, onClick }: ImpactRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer border-b border-border/[0.06] last:border-b-0 transition-all duration-600",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Shimmer spotlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.06), transparent 60%)`,
        }}
      />

      {/* Desktop: grid row */}
      <div className="relative z-10 hidden md:grid md:grid-cols-[1fr_1fr_1.5fr_auto] items-center gap-4 px-6 lg:px-8 py-5">
        {/* Client name + logo */}
        <div className="flex items-center gap-3">
          {study.logo ? (
            <img
              src={study.logo}
              alt={study.name}
              className="h-6 w-auto shrink-0 object-contain opacity-80"
            />
          ) : (
            <div className="h-6 w-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-[9px] font-bold text-primary">
                {study.name.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-foreground">{study.name}</span>
        </div>

        {/* Category pill */}
        <div>
          <span className="inline-block rounded-full border border-border/40 bg-white/[0.02] px-3 py-1 text-[11px] text-muted-foreground">
            {study.category}
          </span>
        </div>

        {/* Metric chips */}
        <div className="flex flex-wrap gap-2">
          {study.chipStats.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-md border border-primary/15 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary/90"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Chevron */}
        <ChevronRight
          size={16}
          className={cn(
            "text-muted-foreground/40 transition-all duration-300",
            isHovered && "text-primary translate-x-0.5"
          )}
        />
      </div>

      {/* Mobile: stacked card */}
      <div className="relative z-10 md:hidden px-5 py-5">
        <div className="flex items-center gap-3 mb-3">
          {study.logo ? (
            <img
              src={study.logo}
              alt={study.name}
              className="h-5 w-auto shrink-0 object-contain opacity-80"
            />
          ) : (
            <div className="h-5 w-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-[8px] font-bold text-primary">
                {study.name.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-foreground flex-1">{study.name}</span>
          <ChevronRight size={14} className="text-muted-foreground/40" />
        </div>
        <span className="inline-block rounded-full border border-border/40 bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-muted-foreground mb-3">
          {study.category}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {study.chipStats.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-md border border-primary/15 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary/90"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactRow;
