import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: "200k", label: "Active app users" },
  { value: "50%", label: "Ticket sales via app" },
  { value: "19M*", label: "Ticket revenue (CHF)" },
  { value: "300%", label: "Online sales increase" },
];

const ShimmerCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 transition-all duration-500",
        isHovered && "border-primary/30 shadow-2xl shadow-primary/10 -translate-y-1",
        className
      )}
      style={{
        background: "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(230 20% 4%) 100%)",
      }}
    >
      {/* Moving shimmer spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.12), transparent 60%)`,
        }}
      />

      {/* Continuous shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(355 85% 60% / 0.06) 45%, hsl(0 0% 100% / 0.04) 50%, hsl(355 85% 60% / 0.06) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.3,
          background: `conic-gradient(from 180deg at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.15), transparent 30%, hsl(355 85% 50% / 0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

const SocialProofSection = () => {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Case Study: LAAX
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Results that speak for themselves.
          </h2>
        </div>

        <ShimmerCard className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/[0.06]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center px-6 py-10 transition-all duration-700",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-foreground leading-none mb-3">
                  {stat.value.replace(/[^0-9]/g, "")}
                  <span className="text-primary">{stat.value.replace(/[0-9]/g, "")}</span>
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </ShimmerCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          * Values in Swiss Franc (CHF). Winter 2018/19 season.
        </p>
      </div>
    </section>
  );
};

export default SocialProofSection;
