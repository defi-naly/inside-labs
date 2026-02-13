const clientLogos = [
  { src: "/images/logos/laax.png", alt: "LAAX" },
  { src: "/images/logos/ZermattBergbahnen.png", alt: "Zermatt Bergbahnen" },
  { src: "/images/logos/engadin_logo.svg", alt: "Engadin" },
  { src: "/images/logos/bikekingdom.jpg", alt: "Bike Kingdom" },
  { src: "/images/logos/lenzerheide.jpg", alt: "Lenzerheide" },
  { src: "/images/logos/Logo_Schwyz_Tourismus.png", alt: "Schwyz Tourismus" },
];

const ClientsSection = () => {
  return (
    <section className="py-16">
      <p className="mb-10 text-center text-base font-bold uppercase tracking-[0.2em] text-foreground">
        Trusted by leading tourism brands
      </p>

      <div className="flex flex-wrap items-center justify-center gap-10 px-6 md:gap-14">
        {clientLogos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-10 w-auto object-contain brightness-0 invert opacity-50 transition-opacity duration-300 hover:opacity-90 md:h-14"
          />
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
