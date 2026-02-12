const stats = [
  { value: "200k", label: "Active app users" },
  { value: "50%", label: "Of all ticket sales via app" },
  { value: "19M*", label: "Ticket revenue (up from 2.8M)" },
  { value: "300k", label: "App downloads post-launch" },
  { value: "30%", label: "Of all users completed a purchase" },
  { value: "300%", label: "Increase in online sales" },
];

const ResultsSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Title */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary mb-4">
            Case Study
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
            By the numbers:
            <br />
            <span className="text-primary">LAAX App</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-primary/90 p-6 md:p-8 flex flex-col justify-end"
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base font-medium text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <p className="mx-auto max-w-7xl mt-6 text-xs text-muted-foreground px-6 lg:pl-[calc(33.333%+4rem)]">
        * Values quoted in Swiss Franc (CHF). As at Winter 2018/19.
      </p>
    </section>
  );
};

export default ResultsSection;
