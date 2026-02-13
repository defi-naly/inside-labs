import { useTranslation } from "@/i18n";

const clientLogos = [
  { src: "/images/logos/laax.svg", alt: "LAAX", filter: false },
  { src: "/images/logos/zermatt.svg", alt: "Zermatt Bergbahnen", filter: false },
  { src: "/images/logos/engadin_logo.svg", alt: "Engadin", filter: false },
  { src: "/images/logos/stmoritz.svg", alt: "St. Moritz", filter: false },
  { src: "/images/logos/davos.png", alt: "Davos Klosters", filter: false },
  { src: "/images/logos/bikekingdom.jpg", alt: "Bike Kingdom", filter: true },
  { src: "/images/logos/lenzerheide.svg", alt: "Lenzerheide", filter: false },
];

const ClientsSection = () => {
  const { t } = useTranslation();

  const logoElements = clientLogos.map((logo, i) => (
    <img
      key={`${logo.alt}-${i}`}
      src={logo.src}
      alt={logo.alt}
      className={
        logo.filter
          ? "h-10 w-auto shrink-0 object-contain invert mix-blend-screen brightness-[2] opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:h-12"
          : "h-10 w-auto shrink-0 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:h-12"
      }
    />
  ));

  return (
    <section className="py-16">
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {t("clients.heading")}
      </p>

      <div className="group relative overflow-hidden">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
          {logoElements}
          {logoElements}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
