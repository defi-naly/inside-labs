import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  headline: string;
  image: string;
  className?: string;
  accentColor: string;
  delay?: number;
  onClick: () => void;
}

const BentoCard = ({
  headline,
  image,
  className,
  accentColor,
  delay = 0,
  onClick,
}: BentoCardProps) => {
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
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-[3px]",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {/* Subtle red gradient mesh inside */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* Expand icon */}
      <div className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30">
        <ArrowUpRight size={14} className="text-secondary transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
      </div>

      {/* Text */}
      <div className="relative z-10 px-7 pt-7 pb-3">
        <h3 className="text-lg font-bold leading-snug text-foreground lg:text-xl pr-10">
          {headline}
        </h3>
      </div>

      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${accentColor}08, ${accentColor}18)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 80% 30%, ${accentColor}25, transparent 70%)`,
          }}
        />
        <img
          src={image}
          alt={headline}
          className="relative z-10 mx-auto h-auto w-full max-w-[85%] object-contain pt-4 pb-2 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BentoCard;
