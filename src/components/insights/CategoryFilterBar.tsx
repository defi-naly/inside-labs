import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { CATEGORIES, type InsightCategory } from "@/data/insights";

interface CategoryFilterBarProps {
  active: InsightCategory | null;
  onChange: (category: InsightCategory | null) => void;
}

const CategoryFilterBar = ({ active, onChange }: CategoryFilterBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer",
          active === null
            ? "bg-primary/10 text-primary border border-primary/30"
            : "border border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
        )}
      >
        {t("insights.page.allCategories")}
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer",
            active === cat.slug
              ? "bg-primary/10 text-primary border border-primary/30"
              : "border border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
          )}
        >
          {t(cat.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterBar;
