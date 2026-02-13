import { useState, useMemo } from "react";
import { insights, type InsightCategory, type InsightArticle } from "@/data/insights";

const PAGE_SIZE = 12;

export function useInsights(initialCategory?: InsightCategory | null) {
  const [category, setCategory] = useState<InsightCategory | null>(initialCategory ?? null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sorted = useMemo(
    () => [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    []
  );

  const filtered = useMemo(
    () => (category ? sorted.filter((a) => a.category === category) : sorted),
    [sorted, category]
  );

  const featured = useMemo(() => sorted.find((a) => a.featured) ?? sorted[0], [sorted]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  const resetPagination = () => setVisibleCount(PAGE_SIZE);

  const changeCategory = (cat: InsightCategory | null) => {
    setCategory(cat);
    resetPagination();
  };

  const getBySlug = (slug: string): InsightArticle | undefined =>
    insights.find((a) => a.slug === slug);

  const getRelated = (article: InsightArticle, count = 3): InsightArticle[] =>
    sorted
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, count);

  return {
    articles: visible,
    featured,
    category,
    setCategory: changeCategory,
    hasMore,
    loadMore,
    getBySlug,
    getRelated,
    totalCount: filtered.length,
  };
}
