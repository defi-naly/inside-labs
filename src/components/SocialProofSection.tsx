import clients from "@/assets/clients.png";

const testimonials = [
  {
    quote: "Inside Labs transformed how we engage with our guests. Ticket revenue grew from CHF 2.8M to over 19M in three seasons.",
    author: "Reto Poltera",
    role: "CEO, LAAX Resort",
  },
  {
    quote: "50% of all comparable lift tickets are now sold through the app. The ROI speaks for itself.",
    author: "Christian Kraus",
    role: "Head of Digital, LAAX",
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Logos */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Trusted by leading tourism brands
        </p>
        <div className="flex justify-center mb-24">
          <img
            src={clients}
            alt="Client logos"
            className="h-12 w-auto object-contain brightness-0 invert md:h-16"
          />
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-xl border border-border p-8 lg:p-10"
            >
              <p className="text-base leading-relaxed text-foreground mb-8">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
