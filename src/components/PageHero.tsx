import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  headline: string;
  subtitle: string;
  imagePosition?: string;
}

const PageHero = ({ image, eyebrow, headline, subtitle, imagePosition }: PageHeroProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[30vh] md:h-[40vh] overflow-hidden">
      <img
        src={image}
        alt={headline}
        className="absolute inset-0 w-full h-full object-cover"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

      {/* Text overlay */}
      <div className="absolute bottom-12 left-0 right-0 px-6">
        <div className="mx-auto max-w-4xl w-full">
          <span
            className={cn(
              "inline-block text-xs uppercase tracking-[0.25em] text-primary transition-all duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {eyebrow}
          </span>
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            {headline}
          </h1>
          <p
            className={cn(
              "text-base text-muted-foreground mt-3 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
