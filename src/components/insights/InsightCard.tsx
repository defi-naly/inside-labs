import { useRef, useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import type { InsightArticle } from "@/data/insights";
import { CATEGORIES } from "@/data/insights";

interface InsightCardProps {
  article: InsightArticle;
  index?: number;
}

const InsightCard = ({ article, index = 0 }: InsightCardProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

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

  const categoryLabel = CATEGORIES.find((c) => c.slug === article.category);
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a
      ref={ref}
      href={`/insights/${article.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={article.image}
          alt={t(`${article.i18nKey}.title`)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {categoryLabel ? t(categoryLabel.labelKey) : article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            {article.readingTime} min
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {t(`${article.i18nKey}.title`)}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {t(`${article.i18nKey}.excerpt`)}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{article.author}</span>
          <span>{date}</span>
        </div>
      </div>
    </a>
  );
};

export default InsightCard;
