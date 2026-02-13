import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { useTranslation } from "@/i18n";

const clientResultsBase = [
  {
    name: "LAAX",
    logo: "/images/logos/laax.svg",
    statsKey: "laax",
    clientIdx: 0,
    statValues: [
      { value: "200k", suffix: "+" },
      { value: "300", suffix: "%", highlight: true },
      { value: "19M", suffix: "" },
    ],
  },
  {
    name: "Zermatt",
    logo: "/images/logos/zermatt.svg",
    statsKey: "zermatt",
    clientIdx: 1,
    statValues: [
      { value: "116k", suffix: "" },
      { value: "2.6M", suffix: "+", highlight: true },
      { value: "4", suffix: "+★" },
    ],
  },
  {
    name: "Bike Kingdom",
    logo: "/images/logos/bikekingdom.jpg",
    statsKey: "bikekingdom",
    clientIdx: 2,
    filterLogo: true,
    statValues: [
      { value: "40k", suffix: "+" },
      { value: "10.2", suffix: "%", highlight: true },
      { value: "1k", suffix: "+" },
    ],
  },
  {
    name: "Engadin",
    logo: "/images/logos/engadin_logo.svg",
    statsKey: "engadin",
    clientIdx: 3,
    statValues: [
      { value: "6", suffix: "" },
      { value: "360", suffix: "°", highlight: true },
      { value: "100", suffix: "%" },
    ],
  },
];

const quoteAuthors = [
  { author: "Reto Gurtner", client: "LAAX" },
  { author: "Markus Hasler", client: "Zermatt" },
  { author: "Marc Schlüssel", client: "Bike Kingdom" },
  { author: "Michael Kirchner", client: "Engadin" },
];

function ResultCard({
  client,
  index,
  visible,
  t,
}: {
  client: typeof clientResultsBase[number];
  index: number;
  visible: boolean;
  t: (key: string) => string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const category = t(`socialProof.clients[${client.clientIdx}].category`);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 transition-all duration-700",
        isHovered && "border-primary/30 shadow-2xl shadow-primary/10 -translate-y-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        background: "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(230 20% 4%) 100%)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.1), transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <img
            src={client.logo}
            alt={client.name}
            className={cn(
              "h-7 w-auto object-contain",
              (client as any).filterLogo
                ? "invert mix-blend-screen brightness-[2]"
                : "brightness-0 invert opacity-80"
            )}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
            {category}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {client.statValues.map((stat, si) => (
            <div key={si} className="text-center">
              <p className="text-2xl md:text-3xl font-bold tracking-tight leading-none mb-1">
                <span className={stat.highlight ? "text-primary" : "text-foreground"}>
                  {stat.value}
                </span>
                <span className="text-primary text-lg">{stat.suffix}</span>
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {t(`socialProof.clientStats.${client.statsKey}[${si}].label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SocialProofSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quoteAuthors.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span
            className={cn(
              "inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {t("socialProof.eyebrow")}
          </span>
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            {t("socialProof.headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientResultsBase.map((client, i) => (
            <ResultCard key={client.name} client={client} index={i} visible={visible} t={t} />
          ))}
        </div>

        <div
          className={cn(
            "mt-16 max-w-3xl mx-auto text-center transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <Quote size={24} className="mx-auto mb-4 text-primary/30" />

          <div className="relative min-h-[6rem]">
            {quoteAuthors.map((q, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-500 absolute inset-0",
                  i === activeQuote
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                )}
              >
                <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed italic mb-4">
                  &ldquo;{t(`socialProof.quotes[${i}].text`)}&rdquo;
                </blockquote>
                <footer className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground/70">{q.author}</span>
                  <span className="mx-2 text-border">|</span>
                  {t(`socialProof.quotes[${i}].role`)}
                </footer>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {quoteAuthors.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeQuote
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
