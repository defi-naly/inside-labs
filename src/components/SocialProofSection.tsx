import clients from "@/assets/clients.png";

const stats = [
  { value: "200k", label: "Active app users" },
  { value: "50%", label: "Ticket sales via app" },
  { value: "19M*", label: "Ticket revenue (CHF)" },
  { value: "300%", label: "Online sales increase" },
];

const SocialProofSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Case Study Stats */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Case Study: LAAX
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Results that speak for themselves.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-8">
              <p className="text-4xl md:text-5xl font-bold text-primary leading-none mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center mb-24 text-xs text-muted-foreground">
          * Values in Swiss Franc (CHF). Winter 2018/19 season.
        </p>

        {/* Logos */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Trusted by leading tourism brands
        </p>
        <div className="flex justify-center">
          <img
            src={clients}
            alt="Client logos"
            className="h-16 w-auto object-contain md:h-24"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
