import clients from "@/assets/clients.png";

const ClientsSection = () => {
  return (
    <section className="py-16">
      <p className="mb-10 text-center text-base font-bold uppercase tracking-[0.2em] text-foreground">
        Trusted by leading tourism brands
      </p>

      <div className="flex justify-center px-6">
        <img
          src={clients}
          alt="Our clients"
          className="h-16 w-auto object-contain brightness-200 invert md:h-24"
        />
      </div>
    </section>
  );
};

export default ClientsSection;
