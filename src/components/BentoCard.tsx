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
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 transition-all duration-500 ease-out min-h-[340px] lg:min-h-[400px]",
        "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-[3px]",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={headline}
          className="h-full w-full object-cover object-center animate-[float_6s_ease-in-out_infinite]"
          loading="lazy"
          style={{ animationDelay: `${delay * 3}ms` }}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        {/* Accent glow */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${accentColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* Expand icon */}
      <div className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-primary/40 group-hover:bg-black/60">
        <ArrowUpRight size={14} className="text-white/70 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
      </div>

      {/* Text at bottom */}
      <div className="relative z-10 flex h-full flex-col justify-end px-7 pb-7 pt-7">
        <h3 className="text-lg font-bold leading-snug text-white lg:text-xl max-w-[85%] drop-shadow-lg">
          {headline}
        </h3>
      </div>
    </div>
  );
};

export default BentoCard;
