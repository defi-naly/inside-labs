import { Zap, Users, Smartphone, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Event-triggered campaigns",
    outcome: "300% increase in online sales",
    description: "Deploy from 20+ proven campaign templates that fire based on real guest behavior.",
  },
  {
    icon: Users,
    title: "Unified guest profiles",
    outcome: "3.2× repeat visit rate",
    description: "Every touchpoint — booking, on-site, post-visit — feeds one intelligent profile.",
  },
  {
    icon: Smartphone,
    title: "White-label guest app",
    outcome: "200k active users",
    description: "A fully branded iOS and Android app that adapts to each guest's journey stage.",
  },
  {
    icon: BarChart3,
    title: "Revenue attribution",
    outcome: "50% of ticket sales via app",
    description: "Know exactly which campaigns drive bookings, tickets, and upsells.",
  },
];

const FeatureOutcomesSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Features → Outcomes
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to engage guests at scale.
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-border p-8 transition-colors hover:border-primary/20"
              >
                <Icon size={20} className="text-primary mb-6" />
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{f.description}</p>
                <p className="text-sm font-semibold text-primary">{f.outcome}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureOutcomesSection;
