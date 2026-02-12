import { useRef, useEffect, useState } from "react";
import {
  Unplug,
  UserX,
  Mail,
  TrendingDown,
  Layers,
  UserCheck,
  Zap,
  TrendingUp,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  { icon: Unplug, title: "Fragmented Tools", desc: "Disconnected systems that don't talk to each other." },
  { icon: UserX, title: "No Guest Data", desc: "Zero visibility into who your guests actually are." },
  { icon: Mail, title: "Generic Messaging", desc: "One-size-fits-all campaigns that get ignored." },
  { icon: TrendingDown, title: "One-Time Visits", desc: "Guests leave and never come back." },
];

const solutions = [
  { icon: Layers, title: "Unified Platform", desc: "Every tool connected in a single dashboard." },
  { icon: UserCheck, title: "Smart Profiles", desc: "Rich guest profiles built automatically." },
  { icon: Zap, title: "Automated Campaigns", desc: "Personalised messages at the perfect moment." },
  { icon: TrendingUp, title: "Repeat Buyers", desc: "Turn one-time visitors into loyal guests." },
];

const ProblemSolutionSection = () => {
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
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-4xl">
        {/* Problem */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            The problem
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            Tourism brands lose guests after the first visit.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {problems.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "group rounded-xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-muted/10 hover:border-muted-foreground/20",
                visible ? "animate-fade-up" : "opacity-0 translate-y-6"
              )}
              style={{ animationDelay: visible ? `${i * 100}ms` : undefined }}
            >
              <item.icon size={24} className="text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Animated Divider */}
        <div className="flex flex-col items-center gap-1 mb-16">
          <ChevronDown size={20} className={cn("text-primary", visible && "animate-pulse-slow")} />
          <ChevronDown size={20} className={cn("text-primary/60", visible && "animate-pulse-slow")} style={{ animationDelay: "200ms" }} />
          <ChevronDown size={20} className={cn("text-primary/30", visible && "animate-pulse-slow")} style={{ animationDelay: "400ms" }} />
        </div>

        {/* Solution */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            The solution
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            One platform for the entire guest journey.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {solutions.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "group rounded-xl border border-primary/10 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30",
                visible ? "animate-fade-up" : "opacity-0 translate-y-6"
              )}
              style={{ animationDelay: visible ? `${400 + i * 100}ms` : undefined }}
            >
              <item.icon size={24} className="text-primary mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/product"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Learn how it works
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
