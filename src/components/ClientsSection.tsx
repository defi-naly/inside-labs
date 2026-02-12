import clients from "@/assets/clients.png";

const ClientsSection = () => {
  return (
    <section className="overflow-hidden py-16">
      <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
        Trusted by leading tourism brands
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-scroll gap-16">
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-40 grayscale invert md:h-16"
          />
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-40 grayscale invert md:h-16"
          />
          <img
            src={clients}
            alt="Our clients"
            className="h-12 w-auto flex-shrink-0 object-contain opacity-40 grayscale invert md:h-16"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
