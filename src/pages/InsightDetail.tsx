import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ArticleHeader from "@/components/insights/ArticleHeader";
import ContentRenderer from "@/components/insights/ContentRenderer";
import RelatedInsights from "@/components/insights/RelatedInsights";
import { useInsights } from "@/hooks/useInsights";
import { useTranslation } from "@/i18n";
import { CATEGORIES, type ContentBlock } from "@/data/insights";

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, tRaw } = useTranslation();
  const { getBySlug, getRelated } = useInsights();

  const article = slug ? getBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const body = tRaw(`${article.i18nKey}.body`) as ContentBlock[] | undefined;
  const related = getRelated(article, 3);
  const categoryLabel = CATEGORIES.find((c) => c.slug === article.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(`${article.i18nKey}.title`),
    description: t(`${article.i18nKey}.excerpt`),
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Inside Labs AG",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("insights.page.headline"),
        item: "/insights",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel ? t(categoryLabel.labelKey) : article.category,
        item: `/insights?category=${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t(`${article.i18nKey}.title`),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={t(`${article.i18nKey}.title`)}
        description={t(`${article.i18nKey}.excerpt`)}
        type="article"
        publishedTime={article.publishedAt}
        author={article.author}
        image={article.image}
        jsonLd={jsonLd}
      />
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Navbar />
      <ArticleHeader article={article} />

      {/* Hero image */}
      <div className="px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <img
            src={article.image}
            alt={t(`${article.i18nKey}.title`)}
            className="w-full max-h-[50vh] object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Article body */}
      <article className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          {body && Array.isArray(body) ? (
            <ContentRenderer blocks={body} />
          ) : (
            <p className="text-muted-foreground">Content not available.</p>
          )}
        </div>
      </article>

      <RelatedInsights articles={related} />
      <CTASection />
      <Footer />
    </main>
  );
};

export default InsightDetail;
