import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n";

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Subtle glow */}
        <div
          className="pointer-events-none absolute -inset-20 -z-10"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, hsl(355 85% 40% / 0.06), transparent 70%)",
          }}
        />

        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-6">
          {t("cta.headline")}
        </h2>
        <p className="mx-auto max-w-lg text-base text-muted-foreground mb-10">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            {t("cta.primary")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
