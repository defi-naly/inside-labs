import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  icon: React.ReactNode;
  headline: string;
  deeperText: string;
  image: string;
  className?: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}

const BentoCard = ({
  icon,
  headline,
  deeperText,
  image,
  className,
  gradientFrom,
  gradientTo,
  delay = 0,
}: BentoCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onClick={() => setExpanded((prev) => !prev)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-black/10",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {/* Expand icon top-right */}
      <div className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 group-hover:border-border group-hover:bg-background">
        <ArrowUpRight size={14} className="text-muted-foreground transition-transform duration-300 group-hover:text-foreground" />
      </div>

      {/* Text content at top */}
      <div className="relative z-10 px-7 pt-7 pb-4">
        <h3 className="mb-1 text-xl font-bold leading-snug text-foreground lg:text-[1.4rem] pr-10">
          {headline}
        </h3>

        {/* Expandable content */}
        <div
          className={cn(
            "grid transition-all duration-400 ease-out",
            expanded
              ? "mt-2 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {deeperText}
            </p>
            <a
              href="/omni-suite"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Explore the Omni Suite →
            </a>
          </div>
        </div>
      </div>

      {/* Image area with gradient background */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}30, ${gradientTo}50)`,
        }}
      >
        {/* Gradient overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse at 70% 20%, ${gradientFrom}40, transparent 70%)`,
          }}
        />
        <img
          src={image}
          alt={headline}
          className="relative z-10 mx-auto h-auto w-full max-w-[90%] object-contain pt-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BentoCard;
