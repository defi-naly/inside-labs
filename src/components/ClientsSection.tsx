import clients from "@/assets/clients.png";

const ClientsSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Trusted by leading tourism brands
      </p>
      <div className="mx-auto max-w-4xl">
        <img
          src={clients}
          alt="Our clients"
          className="h-auto w-full object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ClientsSection;