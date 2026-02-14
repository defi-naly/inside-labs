import { useState, useEffect, useRef } from "react";
import { Zap, Users, Crown, MessageSquare, TrendingUp, Shield, Star, Trophy, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

/* ─── Dashboard Components ─── */

const CRMDashboard = ({ bars, t }: { bars: number[]; t: (key: string) => string }) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const stages = [0, 1, 2, 3, 4].map(i => t(`omniSuite.dashboard.stages[${i}]`));
  const funnelWidths = [100, 78, 55, 40, 28];
  const funnelValues = ["12.4k", "9.7k", "6.8k", "4.9k", "3.5k"];
  const conversionRates = ["78%", "70%", "72%", "71%"];

  return (
    <>
      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Users size={14} className="text-primary" />
            {t("omniSuite.dashboard.guestJourneyFunnel")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-primary font-semibold">28.2%</span>
            <TrendingUp size={10} className="text-emerald-500" />
          </div>
        </div>
        <div className="space-y-2">
          {stages.map((stage, i) => (
            <div
              key={stage}
              className={cn(
                "flex items-center gap-3 rounded-md px-1 py-0.5 transition-all duration-200",
                hoveredStage === i && "bg-white/[0.03]"
              )}
              onMouseEnter={() => setHoveredStage(i)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <span className={cn(
                "text-[10px] w-16 shrink-0 transition-all duration-200",
                hoveredStage === i ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>{stage}</span>
              <div className="flex-1 relative h-7 flex items-center">
                <div
                  className="h-full rounded-md transition-all duration-500"
                  style={{
                    width: `${funnelWidths[i]}%`,
                    background: `linear-gradient(90deg, hsl(355 85% ${45 - i * 3}%) 0%, hsl(355 85% ${55 - i * 3}%) 100%)`,
                    opacity: hoveredStage !== null ? (hoveredStage === i ? 1 : 0.4) : 1 - i * 0.1,
                    boxShadow: hoveredStage === i ? "0 0 12px hsl(355 85% 50% / 0.3)" : "none",
                  }}
                />
                <span className={cn(
                  "absolute right-0 text-[10px] font-semibold transition-all duration-200",
                  hoveredStage === i ? "text-primary" : "text-foreground/70"
                )}>{funnelValues[i]}</span>
              </div>
              {hoveredStage === i && i < conversionRates.length && (
                <span className="text-[9px] text-emerald-500 font-medium shrink-0">{conversionRates[i]}</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

const EcommerceDashboard = ({ bars, t }: { bars: number[]; t: (key: string) => string }) => {
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const channelNames = [0, 1, 2, 3].map(i => t(`omniSuite.dashboard.channels[${i}]`));
  const channels = [
    { value: 38, color: "hsl(355 85% 50%)" },
    { value: 27, color: "hsl(355 85% 50% / 0.7)" },
    { value: 22, color: "hsl(355 85% 50% / 0.4)" },
    { value: 13, color: "hsl(355 85% 50% / 0.2)" },
  ];
  const channelRevenue = ["CHF 912k", "CHF 648k", "CHF 528k", "CHF 312k"];
  const days = [0, 1, 2, 3, 4, 5, 6].map(i => t(`omniSuite.dashboard.days[${i}]`));

  return (
    <>
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Zap size={14} className="text-primary" />
            {t("omniSuite.dashboard.revenueByChannel")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-primary font-semibold">CHF 2.4M</span>
            <TrendingUp size={10} className="text-emerald-500" />
            <span className="text-[9px] text-emerald-500 font-medium">+12%</span>
          </div>
        </div>
        <div className="relative flex h-8 rounded-lg overflow-hidden mb-3">
          {channels.map((ch, i) => (
            <div
              key={channelNames[i]}
              className="relative h-full transition-all duration-500"
              style={{
                width: `${ch.value}%`,
                background: ch.color,
                opacity: hoveredChannel !== null ? (hoveredChannel === i ? 1 : 0.4) : 1,
              }}
              onMouseEnter={() => setHoveredChannel(i)}
              onMouseLeave={() => setHoveredChannel(null)}
            >
              {hoveredChannel === i && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-border/40 backdrop-blur-sm rounded px-2 py-1 text-[8px] text-foreground whitespace-nowrap z-20">
                  {channelNames[i]}: {channelRevenue[i]}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {channels.map((ch, i) => (
            <div
              key={channelNames[i]}
              className={cn(
                "flex items-center gap-1.5 transition-all duration-200",
                hoveredChannel !== null && hoveredChannel !== i && "opacity-40"
              )}
            >
              <div className="h-2 w-2 rounded-full" style={{ background: ch.color }} />
              <span className="text-[10px] text-muted-foreground">{channelNames[i]} {ch.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">{t("omniSuite.dashboard.conversionRate")}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-primary font-bold">4.8%</span>
            <TrendingUp size={10} className="text-emerald-500" />
          </div>
        </div>
        {(() => {
          const dayBars = [42, 55, 48, 62, 70, 82, 65];
          const dayPeakIdx = dayBars.reduce((maxI, v, i, arr) => v > arr[maxI] ? i : maxI, 0);
          return (
            <>
              <div className="relative h-20">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
                  <div className="h-px bg-border/[0.08]" />
                  <div className="h-px bg-border/[0.08]" />
                  <div className="h-px bg-border/[0.08]" />
                </div>
                <div className="flex items-end gap-1.5 h-full">
                  {dayBars.map((v, i) => {
                    const isPeak = i === dayPeakIdx;
                    const isHovered = hoveredBar === i;
                    const highlight = isPeak || isHovered;
                    return (
                      <div
                        key={i}
                        className="relative flex-1 h-full flex items-end"
                        onMouseEnter={() => setHoveredBar(i)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {isHovered && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-primary font-semibold z-10">{v}%</div>
                        )}
                        <div
                          className="w-full rounded-t-sm transition-all duration-500"
                          style={{
                            height: `${v}%`,
                            background: highlight
                              ? "linear-gradient(to top, hsl(355 85% 40%), hsl(355 85% 55%))"
                              : `hsl(355 85% 50% / ${0.15 + (v / 100) * 0.3})`,
                            boxShadow: highlight ? "0 0 12px hsl(355 85% 50% / 0.3)" : "none",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-1.5 mt-1.5">
                {days.map((d, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex-1 text-center text-[8px]",
                      i === dayPeakIdx ? "text-primary font-semibold" : "text-muted-foreground/40"
                    )}
                  >{d}</span>
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </>
  );
};

const MembershipDashboard = ({ t }: { t: (key: string) => string }) => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const tierConfig = [
    { color: "hsl(30 50% 40%)", colorLight: "hsl(30 50% 55%)", Icon: Shield },
    { color: "hsl(220 10% 60%)", colorLight: "hsl(220 10% 75%)", Icon: Star },
    { color: "hsl(45 80% 50%)", colorLight: "hsl(45 80% 65%)", Icon: Trophy },
    { color: "hsl(270 40% 55%)", colorLight: "hsl(270 40% 70%)", Icon: Gem },
  ];
  const tierNames = [0, 1, 2, 3].map(i => t(`omniSuite.dashboard.tiers[${i}]`));
  const tiers = [
    { members: "4.2k", pct: 45, spend: "CHF 120" },
    { members: "2.8k", pct: 30, spend: "CHF 280" },
    { members: "1.6k", pct: 17, spend: "CHF 540" },
    { members: "720", pct: 8, spend: "CHF 1,200" },
  ];

  const gaugeRadius = 42;
  const gaugeCx = 60;
  const gaugeCy = 58;
  const gaugeArc = Math.PI;
  const gaugeCircumference = gaugeRadius * gaugeArc;
  const gaugeFill = 0.72;
  const tickPositions = [0, 0.25, 0.5, 0.75, 1];

  return (
    <>
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <Crown size={14} className="text-primary" />
          {t("omniSuite.dashboard.membershipTiers")}
        </div>
        <div className="space-y-3">
          {tiers.map((tier, i) => {
            const { color, colorLight, Icon } = tierConfig[i];
            const isHovered = hoveredTier === i;
            return (
              <div
                key={tierNames[i]}
                className={cn(
                  "flex items-center gap-3 rounded-md px-1 py-1 transition-all duration-200",
                  isHovered && "bg-white/[0.03]"
                )}
                onMouseEnter={() => setHoveredTier(i)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-200"
                  style={{
                    borderColor: color,
                    background: `${color}20`,
                    boxShadow: isHovered ? `0 0 10px ${color}` : "none",
                  }}
                >
                  <Icon size={12} style={{ color }} />
                </div>
                <div className="flex-1 h-6 rounded-md bg-muted/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-md transition-all duration-500"
                    style={{
                      width: `${tier.pct}%`,
                      background: `linear-gradient(90deg, ${color}, ${colorLight})`,
                      boxShadow: isHovered ? `0 0 10px ${color}` : "none",
                    }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-foreground/60">
                    {tier.members}
                  </span>
                </div>
                <span className={cn(
                  "text-[10px] w-16 text-right shrink-0 transition-all duration-200",
                  isHovered ? "text-foreground" : "text-muted-foreground"
                )}>
                  {tier.spend}/yr
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">{t("omniSuite.dashboard.renewalRate")}</span>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={10} className="text-emerald-500" />
            <span className="text-[9px] text-emerald-500 font-medium">{t("omniSuite.dashboard.vsLastSeason")}</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <svg viewBox="0 0 120 70" className="w-32 shrink-0">
            <defs>
              <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(355 85% 35%)" />
                <stop offset="100%" stopColor="hsl(355 85% 60%)" />
              </linearGradient>
            </defs>
            <path
              d={`M ${gaugeCx - gaugeRadius} ${gaugeCy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${gaugeCx + gaugeRadius} ${gaugeCy}`}
              fill="none" stroke="hsl(355 85% 50% / 0.12)" strokeWidth="6" strokeLinecap="round"
            />
            <path
              d={`M ${gaugeCx - gaugeRadius} ${gaugeCy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${gaugeCx + gaugeRadius} ${gaugeCy}`}
              fill="none" stroke="url(#gauge-grad)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${gaugeFill * gaugeCircumference} ${gaugeCircumference}`}
            />
            {tickPositions.map((pos, i) => {
              const angle = Math.PI - pos * Math.PI;
              const outerR = gaugeRadius + 5;
              const innerR = gaugeRadius - 5;
              const x1 = gaugeCx + Math.cos(angle) * outerR;
              const y1 = gaugeCy - Math.sin(angle) * outerR;
              const x2 = gaugeCx + Math.cos(angle) * innerR;
              const y2 = gaugeCy - Math.sin(angle) * innerR;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(355 85% 50% / 0.25)" strokeWidth="1"
                />
              );
            })}
            {(() => {
              const needleAngle = Math.PI - gaugeFill * Math.PI;
              const nx = gaugeCx + Math.cos(needleAngle) * gaugeRadius;
              const ny = gaugeCy - Math.sin(needleAngle) * gaugeRadius;
              return (
                <>
                  <circle cx={nx} cy={ny} r="5" fill="hsl(355 85% 50% / 0.2)" />
                  <circle cx={nx} cy={ny} r="3" fill="hsl(355 85% 50%)" />
                </>
              );
            })()}
            <text x={gaugeCx} y={gaugeCy - 6} textAnchor="middle" className="fill-primary text-[14px] font-bold">72%</text>
            <text x={gaugeCx} y={gaugeCy + 6} textAnchor="middle" className="fill-muted-foreground text-[6px]">{t("omniSuite.dashboard.annualRenewal")}</text>
          </svg>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-muted-foreground">{t("omniSuite.dashboard.totalMembers")}</p>
              <p className="text-sm font-bold text-foreground">9,320</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{t("omniSuite.dashboard.revenueRetention")}</p>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-foreground">84%</p>
                <span className="text-[9px] text-emerald-500 font-medium">+5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CommsDashboard = ({ t }: { t: (key: string) => string }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const channelNames = [0, 1, 2, 3].map(i => t(`omniSuite.dashboard.channels[${i}]`));
  const channels = [
    { sent: "45.2k", opened: "68%", ctr: "12%" },
    { sent: "128k", opened: "82%", ctr: "24%" },
    { sent: "18.4k", opened: "95%", ctr: "31%" },
    { sent: "92k", opened: "74%", ctr: "18%" },
  ];
  const bestCTRIdx = 2;

  const donutRadius = 15;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const donutFill = 0.94;

  return (
    <>
      <div className="rounded-xl border border-border/30 bg-black/20 p-5 mb-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-foreground">
          <MessageSquare size={14} className="text-primary" />
          {t("omniSuite.dashboard.channelPerformance")}
        </div>
        <div className="grid grid-cols-4 gap-1 mb-2 px-1">
          <span className="text-[9px] text-muted-foreground/50 font-semibold uppercase tracking-wider">{t("omniSuite.dashboard.tableHeaders.channel")}</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold uppercase tracking-wider text-right">{t("omniSuite.dashboard.tableHeaders.sent")}</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold uppercase tracking-wider text-right">{t("omniSuite.dashboard.tableHeaders.opened")}</span>
          <span className="text-[9px] text-muted-foreground/50 font-semibold uppercase tracking-wider text-right">{t("omniSuite.dashboard.tableHeaders.ctr")}</span>
        </div>
        {channels.map((ch, i) => (
          <div
            key={channelNames[i]}
            className={cn(
              "grid grid-cols-4 gap-1 py-2 px-1 border-t border-border/[0.06] transition-all duration-200",
              hoveredRow === i && "bg-white/[0.04]"
            )}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <span className={cn(
              "text-xs font-medium transition-all duration-200",
              hoveredRow === i ? "text-foreground" : "text-foreground"
            )}>
              {channelNames[i]}
              {i === bestCTRIdx && (
                <span className="ml-1.5 text-[7px] text-emerald-500 bg-emerald-500/10 rounded-full px-1.5 py-0.5 font-semibold">BEST</span>
              )}
            </span>
            <span className={cn(
              "text-xs text-right transition-all duration-200",
              hoveredRow === i ? "text-foreground" : "text-muted-foreground"
            )}>{ch.sent}</span>
            <span className={cn(
              "text-xs text-right transition-all duration-200",
              hoveredRow === i ? "text-foreground" : "text-foreground"
            )}>{ch.opened}</span>
            <span className={cn(
              "text-xs font-semibold text-right transition-all duration-200",
              i === bestCTRIdx ? "text-emerald-500" : "text-primary"
            )}>{ch.ctr}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border/30 bg-black/20 p-5">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full blur-xl" style={{ background: "hsl(355 85% 50% / 0.15)" }} />
            <svg viewBox="0 0 36 36" className="relative h-20 w-20">
              <defs>
                <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(355 85% 35%)" />
                  <stop offset="100%" stopColor="hsl(355 85% 60%)" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r={donutRadius} fill="none" stroke="hsl(355 85% 50% / 0.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r={donutRadius} fill="none" stroke="url(#donut-grad)" strokeWidth="3"
                strokeDasharray={`${donutFill * donutCircumference} ${donutCircumference}`}
                strokeLinecap="round" transform="rotate(-90 18 18)"
              />
              <text x="18" y="17" textAnchor="middle" dominantBaseline="middle" className="fill-primary text-[5px] font-bold">94%</text>
              <text x="18" y="22" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[3px]">{t("omniSuite.dashboard.delivery")}</text>
            </svg>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("omniSuite.dashboard.messagesSent")}</p>
              <p className="text-lg font-bold text-foreground">283.6k</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("omniSuite.dashboard.avgOpenRate")}</p>
              <p className="text-lg font-bold text-primary">3.4x <span className="text-[9px] text-emerald-500 bg-emerald-500/10 rounded-full px-1.5 py-0.5 font-normal">{t("omniSuite.dashboard.vsIndustry")}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Tab Data ─── */

const tabsConfig = [
  {
    icon: Users,
    statValues: [
      { value: "3.2x", highlight: true },
      { value: "89%" },
      { value: "47%" },
    ],
    chartBars: [30, 45, 40, 55, 50, 65, 60, 72, 68, 80, 85, 92],
    Dashboard: CRMDashboard,
  },
  {
    icon: MessageSquare,
    statValues: [
      { value: "94%", highlight: true },
      { value: "3.4x" },
      { value: "41%" },
    ],
    chartBars: [40, 35, 50, 55, 60, 58, 70, 75, 72, 85, 90, 96],
    Dashboard: CommsDashboard,
  },
  {
    icon: Zap,
    statValues: [
      { value: "2.8x", highlight: true },
      { value: "0.06%" },
      { value: "34%" },
    ],
    chartBars: [25, 35, 42, 38, 55, 48, 62, 70, 65, 78, 82, 90],
    Dashboard: EcommerceDashboard,
  },
  {
    icon: Crown,
    statValues: [
      { value: "156%", highlight: true },
      { value: "72%" },
      { value: "5.1x" },
    ],
    chartBars: [35, 40, 38, 50, 55, 52, 68, 72, 75, 82, 88, 94],
    Dashboard: MembershipDashboard,
  },
];

/* ─── Tab Content Panel ─── */

const TabPanel = ({
  tab,
  tabIndex,
  visible,
  contentReady,
  t,
}: {
  tab: (typeof tabsConfig)[number];
  tabIndex: number;
  visible: boolean;
  contentReady: boolean;
  t: (key: string) => string;
}) => {
  const { Dashboard } = tab;
  const show = visible && contentReady;

  const badge = t(`omniSuite.tabs[${tabIndex}].badge`);
  const headline = t(`omniSuite.tabs[${tabIndex}].headline`);
  const body1 = t(`omniSuite.tabs[${tabIndex}].body1`);
  const body2 = t(`omniSuite.tabs[${tabIndex}].body2`);
  const bullets = [0, 1, 2, 3].map(i => t(`omniSuite.tabs[${tabIndex}].bullets[${i}]`));
  const stats = tab.statValues.map((sv, i) => ({
    ...sv,
    label: t(`omniSuite.tabs[${tabIndex}].stats[${i}].label`),
  }));

  return (
    <div className="grid gap-0 lg:grid-cols-5">
      {/* Left — copy */}
      <div className="lg:col-span-2 p-6 md:p-8">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary mb-3 transition-all duration-500",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        >
          <Zap size={10} />
          {badge}
        </div>

        <h3
          className={cn(
            "mb-3 text-xl font-bold tracking-tight text-foreground md:text-2xl leading-tight transition-all duration-500",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: show ? "80ms" : "0ms" }}
        >
          {headline}
        </h3>
        <p
          className={cn(
            "mb-2 text-sm text-muted-foreground leading-relaxed transition-all duration-500",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: show ? "150ms" : "0ms" }}
        >
          {body1}
        </p>
        <p
          className={cn(
            "mb-5 text-xs text-muted-foreground/70 leading-relaxed transition-all duration-500",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: show ? "200ms" : "0ms" }}
        >
          {body2}
        </p>

        <ul className="mb-5 space-y-2">
          {bullets.map((b, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2.5 text-sm text-foreground/90 transition-all duration-500",
                show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: show ? `${250 + i * 60}ms` : "0ms" }}
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10 border border-primary/20">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="hsl(355 85% 50%)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>

      </div>

      {/* Right — dashboard */}
      <div className="lg:col-span-3 border-t border-border/20 lg:border-l lg:border-t-0 p-6 md:p-8">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border border-border/40 bg-black/30 px-4 py-4 text-center backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-black/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: show ? `${i * 100}ms` : "0ms" }}
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

        <div
          className={cn(
            "transition-all duration-500",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: show ? "300ms" : "0ms" }}
        >
          <Dashboard bars={tab.chartBars} t={t} />
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */

const OmniSuiteSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleTab, setVisibleTab] = useState(0);
  const [contentReady, setContentReady] = useState(true);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Intersection observer
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeTab) return;
    setContentReady(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveTab(index);
      setVisibleTab(index);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setContentReady(true));
      });
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full border-t border-border/40 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse, hsl(220 40% 30% / 0.03), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: "radial-gradient(ellipse, hsl(355 85% 50%), transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-32 lg:py-40">
        {/* Social proof stats */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          {[
            { value: "800k+", label: t("impact.stats[0].label") },
            { value: "6", label: t("impact.stats[1].label") },
            { value: "CHF 19M+", label: t("impact.stats[2].label") },
            { value: "4+\u2605", label: t("impact.stats[3].label") },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-black/20 backdrop-blur-sm px-6 py-5 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div
          className={cn(
            "text-center mb-10 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("omniSuite.title")}
          </h2>
        </div>

        {/* Tab bar */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-3 mb-0 max-w-3xl mx-auto transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {tabsConfig.map((tab, i) => {
            const isActive = activeTab === i;
            const Icon = tab.icon;
            const label = t(`omniSuite.tabs[${i}].label`);
            return (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className={cn(
                  "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/40 bg-card/20 text-muted-foreground hover:border-border/60 hover:bg-card/40"
                )}
              >
                <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          className={cn(
            "relative mt-6 rounded-2xl border border-border/60 overflow-hidden transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{
            background: "linear-gradient(165deg, hsl(230 15% 6%) 0%, hsl(230 20% 3%) 50%, hsl(230 15% 5%) 100%)",
            transitionDelay: "550ms",
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div
            className={cn(
              "transition-all duration-[400ms] ease-out",
              contentReady && visibleTab === activeTab
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            <TabPanel tab={tabsConfig[activeTab]} tabIndex={activeTab} visible={visibleTab === activeTab} contentReady={contentReady} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OmniSuiteSection;
