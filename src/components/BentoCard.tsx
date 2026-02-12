import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
  imagePosition?: "left" | "right";
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
  imagePosition = "right",
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
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5",
        "hover:border-transparent",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={{
        transitionProperty: "transform, opacity, box-shadow, border-color",
        transitionDuration: "500ms, 700ms, 300ms, 300ms",
      }}
    >
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          padding: "1.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Gradient glow behind */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col md:flex-row md:items-center md:gap-6",
          imagePosition === "left" && "md:flex-row-reverse"
        )}
      >
        {/* Text content */}
        <div className="flex-1 p-8">
          {/* Icon */}
          <div
            className="mb-5 inline-flex rounded-xl p-3 transition-colors duration-300"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}15, ${gradientTo}15)`,
            }}
          >
            {icon}
          </div>

          {/* Headline */}
          <h3 className="mb-3 text-xl font-semibold leading-snug text-foreground lg:text-2xl">
            {headline}
          </h3>

          {/* Learn more indicator */}
          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            <span>{expanded ? "Close" : "Learn more"}</span>
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-300",
                expanded && "rotate-180"
              )}
            />
          </div>

          {/* Expandable content */}
          <div
            className={cn(
              "grid transition-all duration-400 ease-out",
              expanded
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <p className="text-base leading-relaxed text-muted-foreground">
                {deeperText}
              </p>
              <a
                href="/omni-suite"
                onClick={(e) => e.stopPropagation()}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Explore the Omni Suite →
              </a>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 p-4 md:p-6">
          <img
            src={image}
            alt={headline}
            className="h-auto w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
