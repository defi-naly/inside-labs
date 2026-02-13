import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import InsightsHero from "@/components/insights/InsightsHero";
import CategoryFilterBar from "@/components/insights/CategoryFilterBar";
import InsightCard from "@/components/insights/InsightCard";
import { useInsights } from "@/hooks/useInsights";
import { useTranslation } from "@/i18n";
import type { InsightCategory } from "@/data/insights";

const InsightsHub = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get("category") as InsightCategory | null;

  const {
    articles,
    featured,
    category,
    setCategory,
    hasMore,
    loadMore,
    totalCount,
  } = useInsights(paramCategory);

  useEffect(() => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }, [category, setSearchParams]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("insights.page.headline"),
    description: t("insights.page.subtitle"),
    publisher: {
      "@type": "Organization",
      name: "Inside Labs AG",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={t("insights.page.headline")}
        description={t("insights.page.subtitle")}
        jsonLd={jsonLd}
      />
      <Navbar />
      <InsightsHero featured={featured} />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <CategoryFilterBar active={category} onChange={setCategory} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <InsightCard key={article.slug} article={article} index={i} />
            ))}
          </div>

          {articles.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              {t("insights.page.noResults")}
            </p>
          )}

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={loadMore}
                className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary cursor-pointer"
              >
                {t("insights.page.loadMore")} ({totalCount - articles.length} more)
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default InsightsHub;
