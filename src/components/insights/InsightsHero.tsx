import { ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "@/i18n";
import { CATEGORIES, type InsightArticle } from "@/data/insights";

interface InsightsHeroProps {
  featured: InsightArticle;
}

const InsightsHero = ({ featured }: InsightsHeroProps) => {
  const { t } = useTranslation();
  const categoryLabel = CATEGORIES.find((c) => c.slug === featured.category);

  return (
    <section className="pt-32 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">
            {t("insights.page.eyebrow")}
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("insights.page.headline")}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            {t("insights.page.subtitle")}
          </p>
        </div>

        <a
          href={`/insights/${featured.slug}`}
          className="group grid gap-8 rounded-2xl border border-border/40 bg-card p-2 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:grid-cols-5"
        >
          <div className="relative overflow-hidden rounded-xl md:col-span-3">
            <img
              src={featured.image}
              alt={t(`${featured.i18nKey}.title`)}
              className="aspect-[16/9] md:aspect-auto md:h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-4 md:col-span-2 md:py-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {categoryLabel ? t(categoryLabel.labelKey) : featured.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {featured.readingTime} min
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-bold leading-tight text-foreground md:text-3xl group-hover:text-primary transition-colors">
              {t(`${featured.i18nKey}.title`)}
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {t(`${featured.i18nKey}.excerpt`)}
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              {t("insights.page.readArticle")}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default InsightsHero;
