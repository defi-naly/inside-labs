import { useEffect, useRef } from "react";
import { X, ArrowRight, Zap, Users, Globe, Smartphone, Crown, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

interface BulletPoint {
  text: string;
}

interface ExpandedCardData {
  headline: string;
  subtitle: string;
  description: string;
  stats: StatItem[];
  bullets: BulletPoint[];
  chartBars: number[];
  image: string;
  accentColor: string;
  dashboardType?: number;
}

interface ExpandedCardProps {
  data: ExpandedCardData;
  onClose: () => void;
}

/* ─── Unique dashboard for each card ─── */

// Card 0: CRM — Guest journey funnel
const CRMDashboard = ({ bars }: { bars: number[] }) => {
  const stages = ["Awareness", "Interest", "Booking", "Visit", "Loyalty"];
  const funnelWidths = [100, 78, 55, 40, 28];
  const funnelValues = ["12.4k", "9.7k", "6.8k", "4.9k", "3.5k"];

  return (
    <>
      {/* Guest journey funnel */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Users size={14} className="text-primary" />
          Guest Journey Funnel
        </div>
        <div className="space-y-2">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground w-16 shrink-0">{stage}</span>
              <div className="flex-1 relative h-7 flex items-center">
                <div
                  className="h-full rounded-md transition-all duration-700"
                  style={{
                    width: `${funnelWidths[i]}%`,
                    background: `linear-gradient(90deg, hsl(355 85% ${45 - i * 3}%) 0%, hsl(355 85% ${55 - i * 3}%) 100%)`,
                    opacity: 1 - i * 0.1,
                  }}
                />
                <span className="absolute right-0 text-[10px] font-semibold text-foreground/70">{funnelValues[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement heatmap */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Globe size={14} className="text-primary" />
          Weekly Engagement Heatmap
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }, (_, i) => {
            const intensity = bars[i % bars.length] / 100;
            return (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  background: `hsl(355 85% 50% / ${0.08 + intensity * 0.5})`,
                }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-muted-foreground/50">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </>
  );
};

// Card 1: E-commerce — Conversion funnel + revenue stream
const EcommerceDashboard = ({ bars }: { bars: number[] }) => {
  const channels = [
    { name: "Push", value: 38, color: "hsl(355 85% 50%)" },
    { name: "Email", value: 27, color: "hsl(355 85% 50% / 0.7)" },
    { name: "In-App", value: 22, color: "hsl(355 85% 50% / 0.4)" },
    { name: "SMS", value: 13, color: "hsl(355 85% 50% / 0.2)" },
  ];

  return (
    <>
      {/* Revenue by channel — horizontal stacked */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Zap size={14} className="text-primary" />
            Revenue by Channel
          </div>
          <span className="text-[10px] text-primary font-semibold">CHF 2.4M</span>
        </div>
        <div className="flex h-8 rounded-lg overflow-hidden mb-3">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="h-full transition-all duration-700"
              style={{ width: `${ch.value}%`, background: ch.color }}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {channels.map((ch) => (
            <div key={ch.name} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: ch.color }} />
              <span className="text-[10px] text-muted-foreground">{ch.name} {ch.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion rate sparkline */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Conversion Rate</span>
          <span className="text-xs text-primary font-bold">4.8%</span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {bars.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${v * 0.7}%`,
                  background: i === bars.length - 1
                    ? "linear-gradient(to top, hsl(355 85% 40%), hsl(355 85% 55%))"
                    : `hsl(355 85% 50% / ${0.1 + (v / 100) * 0.25})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Card 2: App — Device & session dashboard
const AppDashboard = ({ bars }: { bars: number[] }) => {
  const platforms = [
    { label: "iOS", pct: 64, sessions: "8.2k" },
    { label: "Android", pct: 36, sessions: "4.6k" },
  ];

  return (
    <>
      {/* Platform split — donut style */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Smartphone size={14} className="text-primary" />
          Platform Distribution
        </div>
        <div className="flex items-center gap-6">
          {/* SVG donut */}
          <svg viewBox="0 0 36 36" className="h-24 w-24 shrink-0">
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(355 85% 50% / 0.15)" strokeWidth="4" />
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="hsl(355 85% 50%)" strokeWidth="4"
              strokeDasharray={`${64 * 0.88} ${100 * 0.88}`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
            <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[6px] font-bold">
              4.8★
            </text>
          </svg>
          <div className="space-y-3 flex-1">
            {platforms.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-foreground">{p.label}</span>
                  <span className="text-xs text-muted-foreground">{p.sessions} sessions</span>
                </div>
                <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${p.pct}%`, opacity: p.label === "iOS" ? 1 : 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session duration timeline */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Avg Session Duration</span>
          <span className="text-xs text-primary font-bold">18 min</span>
        </div>
        <svg viewBox="0 0 100 40" className="w-full h-16" preserveAspectRatio="none">
          <defs>
            <linearGradient id="session-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(355 85% 50%)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(355 85% 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={bars.map((v, i) => {
              const x = (i / (bars.length - 1)) * 100;
              const y = 40 - (v / 100) * 38;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ") + " L 100 40 L 0 40 Z"}
            fill="url(#session-grad)"
          />
          <path
            d={bars.map((v, i) => {
              const x = (i / (bars.length - 1)) * 100;
              const y = 40 - (v / 100) * 38;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ")}
            fill="none" stroke="hsl(355 85% 50%)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </>
  );
};

// Card 3: Membership — Tier distribution + spend
const MembershipDashboard = () => {
  const tiers = [
    { name: "Bronze", members: "4.2k", pct: 45, spend: "CHF 120" },
    { name: "Silver", members: "2.8k", pct: 30, spend: "CHF 280" },
    { name: "Gold", members: "1.6k", pct: 17, spend: "CHF 540" },
    { name: "Platinum", members: "720", pct: 8, spend: "CHF 1,200" },
  ];

  return (
    <>
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Crown size={14} className="text-primary" />
          Membership Tiers
        </div>
        <div className="space-y-3">
          {tiers.map((t, i) => (
            <div key={t.name} className="flex items-center gap-3">
              <div className="w-16 shrink-0">
                <span className="text-xs font-semibold text-foreground">{t.name}</span>
              </div>
              <div className="flex-1 h-6 rounded-md bg-muted/10 overflow-hidden relative">
                <div
                  className="h-full rounded-md transition-all duration-700"
                  style={{
                    width: `${t.pct}%`,
                    background: `linear-gradient(90deg, hsl(355 85% ${35 + i * 7}%), hsl(355 85% ${45 + i * 7}%))`,
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-foreground/60">
                  {t.members}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground w-16 text-right shrink-0">
                {t.spend}/yr
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Renewal gauge */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-3 text-xs font-semibold text-foreground">Renewal Rate</div>
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 36 20" className="w-28 shrink-0">
            <path d="M 4 18 A 14 14 0 0 1 32 18" fill="none" stroke="hsl(355 85% 50% / 0.15)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 4 18 A 14 14 0 0 1 32 18" fill="none" stroke="hsl(355 85% 50%)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${72 * 0.44} 100`}
            />
            <text x="18" y="17" textAnchor="middle" className="fill-primary text-[5px] font-bold">72%</text>
          </svg>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">72% annual</p>
            <p className="text-[10px] text-muted-foreground">+8% vs last season</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Card 4: Communication — Channel performance radar
const CommsDashboard = ({ bars }: { bars: number[] }) => {
  const channels = [
    { name: "Email", sent: "45.2k", opened: "68%", ctr: "12%" },
    { name: "Push", sent: "128k", opened: "82%", ctr: "24%" },
    { name: "SMS", sent: "18.4k", opened: "95%", ctr: "31%" },
    { name: "In-App", sent: "92k", opened: "74%", ctr: "18%" },
  ];

  return (
    <>
      {/* Channel performance table */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <MessageSquare size={14} className="text-primary" />
          Channel Performance
        </div>
        <div className="grid grid-cols-4 gap-1 mb-2 px-1">
          <span className="text-[9px] text-muted-foreground/50 font-semibold">Channel</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold text-right">Sent</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold text-right">Opened</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold text-right">CTR</span>
        </div>
        {channels.map((ch, i) => (
          <div key={ch.name} className="grid grid-cols-4 gap-1 py-2 px-1 border-t border-border/[0.06]">
            <span className="text-xs text-foreground font-medium">{ch.name}</span>
            <span className="text-xs text-muted-foreground text-right">{ch.sent}</span>
            <span className="text-xs text-foreground text-right">{ch.opened}</span>
            <span className="text-xs text-primary font-semibold text-right">{ch.ctr}</span>
          </div>
        ))}
      </div>

      {/* Delivery rate radial */}
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 36 36" className="h-20 w-20 shrink-0">
            <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(355 85% 50% / 0.1)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(355 85% 50%)" strokeWidth="3"
              strokeDasharray={`${94 * 0.94} 100`} strokeLinecap="round" transform="rotate(-90 18 18)"
            />
            <text x="18" y="17" textAnchor="middle" dominantBaseline="middle" className="fill-primary text-[5px] font-bold">94%</text>
            <text x="18" y="22" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[3px]">delivery</text>
          </svg>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Messages sent</p>
              <p className="text-lg font-bold text-foreground">283.6k</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg open rate</p>
              <p className="text-lg font-bold text-primary">3.4x <span className="text-[10px] text-muted-foreground font-normal">vs industry</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Card 5: Digital Transformation — Project delivery
const TransformationDashboard = () => {
  const projects = [
    { name: "Headless CMS", status: "Live", pct: 100 },
    { name: "360° Guest CRM", status: "Live", pct: 100 },
    { name: "Content Hub", status: "Live", pct: 100 },
    { name: "Commerce Layer", status: "Live", pct: 100 },
    { name: "Partner Portal", status: "Live", pct: 100 },
    { name: "Analytics Suite", status: "Live", pct: 100 },
  ];

  return (
    <div className="rounded-xl border border-border/30 bg-black/20 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <Globe size={14} className="text-primary" />
          Project Delivery
        </div>
        <span className="text-[10px] text-emerald-500 font-semibold">6/6 Live</span>
      </div>
      <div className="space-y-2.5">
        {projects.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="text-[10px] text-foreground/80 w-24 shrink-0">{p.name}</span>
            <div className="flex-1 h-5 rounded-md bg-muted/10 overflow-hidden relative">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${p.pct}%`,
                  background: `linear-gradient(90deg, hsl(355 85% ${40 + i * 3}%), hsl(355 85% ${50 + i * 3}%))`,
                }}
              />
            </div>
            <span className="text-[9px] font-semibold text-emerald-500 w-8 text-right shrink-0">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const dashboards = [CRMDashboard, EcommerceDashboard, AppDashboard, MembershipDashboard, CommsDashboard, TransformationDashboard];

const ExpandedCard = ({ data, onClose }: ExpandedCardProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dashboardIndex = data.dashboardType ?? 0;
  const Dashboard = dashboards[dashboardIndex];

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
          background: "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 50%, hsl(230 15% 5%) 100%)",
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
              Feature
            </div>

            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl leading-tight">
              {data.headline}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
            <p className="mb-8 text-xs text-muted-foreground/70 leading-relaxed">
              {data.description}
            </p>

            <ul className="mb-8 space-y-3">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="hsl(355 85% 50%)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="/omni-suite"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Explore Feature <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right — unique dashboard */}
          <div className="lg:col-span-3 border-t border-border/20 lg:border-l lg:border-t-0 p-8 md:p-10">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {data.stats.map((stat, i) => (
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
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Unique dashboard per card */}
            <Dashboard bars={data.chartBars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;
