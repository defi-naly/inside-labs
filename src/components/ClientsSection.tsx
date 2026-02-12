import clients from "@/assets/clients.png";

const ClientsSection = () => {
  return (
    <section className="overflow-hidden py-16">
      <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by leading tourism brands
      </p>

      {/* Infinite scroll wrapper */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-scroll gap-16">
          {/* Duplicate for seamless loop */}
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-50 grayscale md:h-16"
          />
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-50 grayscale md:h-16"
          />
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-50 grayscale md:h-16"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;