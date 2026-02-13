import { Clock, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n";
import { CATEGORIES, type InsightArticle } from "@/data/insights";

interface ArticleHeaderProps {
  article: InsightArticle;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const { t } = useTranslation();
  const categoryLabel = CATEGORIES.find((c) => c.slug === article.category);

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="pt-32 pb-8 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="/insights" className="hover:text-foreground transition-colors">
            {t("insights.page.headline")}
          </a>
          <ChevronRight size={12} />
          <a
            href={`/insights?category=${article.category}`}
            className="hover:text-foreground transition-colors"
          >
            {categoryLabel ? t(categoryLabel.labelKey) : article.category}
          </a>
          <ChevronRight size={12} />
          <span className="text-foreground line-clamp-1">
            {t(`${article.i18nKey}.title`)}
          </span>
        </nav>

        {/* Category + reading time */}
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {categoryLabel ? t(categoryLabel.labelKey) : article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            {article.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t(`${article.i18nKey}.title`)}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 text-lg text-muted-foreground">
          {t(`${article.i18nKey}.excerpt`)}
        </p>

        {/* Meta row */}
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground border-t border-border/40 pt-6">
          <span className="font-medium text-foreground">{article.author}</span>
          {article.authorRoleKey && (
            <>
              <span className="text-border">·</span>
              <span>{t(article.authorRoleKey)}</span>
            </>
          )}
          <span className="text-border">·</span>
          <span>{date}</span>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
