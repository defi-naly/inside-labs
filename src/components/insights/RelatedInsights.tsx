import { useTranslation } from "@/i18n";
import InsightCard from "./InsightCard";
import type { InsightArticle } from "@/data/insights";

interface RelatedInsightsProps {
  articles: InsightArticle[];
}

const RelatedInsights = ({ articles }: RelatedInsightsProps) => {
  const { t } = useTranslation();

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-border/40 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-2xl font-bold text-foreground">
          {t("insights.page.relatedInsights")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <InsightCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedInsights;
