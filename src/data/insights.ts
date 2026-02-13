export type InsightCategory = "guides" | "strategy" | "interviews" | "product" | "industry";

export interface InsightArticle {
  slug: string;
  category: InsightCategory;
  i18nKey: string;
  publishedAt: string;
  author: string;
  authorRoleKey?: string;
  image: string;
  readingTime: number;
  featured?: boolean;
  tags?: string[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string; role?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export const CATEGORIES: { slug: InsightCategory; labelKey: string }[] = [
  { slug: "guides", labelKey: "insights.categories.guides" },
  { slug: "strategy", labelKey: "insights.categories.strategy" },
  { slug: "interviews", labelKey: "insights.categories.interviews" },
  { slug: "product", labelKey: "insights.categories.product" },
  { slug: "industry", labelKey: "insights.categories.industry" },
];

export const insights: InsightArticle[] = [
  // --- GUIDES ---
  {
    slug: "digital-tourism-trend-radar-2024",
    category: "guides",
    i18nKey: "insights.articles.digital-tourism-trend-radar-2024",
    publishedAt: "2024-03-15",
    author: "Inside Labs & Visit Group",
    image: "/images/insights/trend-radar.png",
    readingTime: 10,
    featured: true,
    tags: ["trends", "digital-transformation", "tourism"],
  },
  {
    slug: "personalized-guest-experiences-guide",
    category: "guides",
    i18nKey: "insights.articles.personalized-guest-experiences-guide",
    publishedAt: "2024-01-22",
    author: "Inside Labs",
    image: "/images/insights/campaign-catalog.png",
    readingTime: 8,
    tags: ["campaigns", "personalization", "customer-journey"],
  },

  // --- STRATEGY ---
  {
    slug: "data-driven-destination-marketing",
    category: "strategy",
    i18nKey: "insights.articles.data-driven-destination-marketing",
    publishedAt: "2024-04-10",
    author: "Kristian Paasila",
    authorRoleKey: "insights.roles.ceoCofounder",
    image: "/images/insights/first-party-data.png",
    readingTime: 10,
    tags: ["data", "marketing", "strategy"],
  },
  {
    slug: "people-as-drivers-of-digital-change",
    category: "strategy",
    i18nKey: "insights.articles.people-as-drivers-of-digital-change",
    publishedAt: "2024-02-28",
    author: "Silvan Schuppisser",
    image: "/images/insights/dmo-to-dme.png",
    readingTime: 9,
    tags: ["change-management", "digital-skills", "transformation"],
  },

  // --- INTERVIEWS ---
  {
    slug: "interview-mauro-gotsch-data-strategies",
    category: "interviews",
    i18nKey: "insights.articles.interview-mauro-gotsch-data-strategies",
    publishedAt: "2024-05-02",
    author: "Inside Labs",
    image: "/images/insights/mauro-gotsch.png",
    readingTime: 7,
    tags: ["data-strategy", "research", "tourism"],
  },
  {
    slug: "interview-annika-aebli-gamification",
    category: "interviews",
    i18nKey: "insights.articles.interview-annika-aebli-gamification",
    publishedAt: "2024-03-20",
    author: "Inside Labs",
    image: "/images/insights/annika-aebli.png",
    readingTime: 6,
    tags: ["gamification", "research", "guest-experience"],
  },

  // --- PRODUCT ---
  {
    slug: "sage-ai-braze-tools-review",
    category: "product",
    i18nKey: "insights.articles.sage-ai-braze-tools-review",
    publishedAt: "2024-06-05",
    author: "Christine De Kegel",
    authorRoleKey: "insights.roles.digitalCampaignCreator",
    image: "/images/insights/ai-personalization.png",
    readingTime: 6,
    tags: ["ai", "braze", "product"],
  },
  {
    slug: "product-roadmap-update-january-2023",
    category: "product",
    i18nKey: "insights.articles.product-roadmap-update-january-2023",
    publishedAt: "2023-01-15",
    author: "Julian Vaupel",
    authorRoleKey: "insights.roles.managingPartner",
    image: "/images/insights/winter-release.jpg",
    readingTime: 5,
    tags: ["roadmap", "features", "product"],
  },

  // --- INDUSTRY ---
  {
    slug: "digital-maturity-destination-benchmark",
    category: "guides",
    i18nKey: "insights.articles.digital-maturity-destination-benchmark",
    publishedAt: "2024-04-25",
    author: "Kristian Paasila",
    authorRoleKey: "insights.roles.ceoCofounder",
    image: "/images/insights/digital-maturity.png",
    readingTime: 11,
    tags: ["digital-maturity", "benchmarking", "research"],
  },
  {
    slug: "partnership-discover-swiss",
    category: "industry",
    i18nKey: "insights.articles.partnership-discover-swiss",
    publishedAt: "2024-12-17",
    author: "Inside Labs",
    image: "/images/insights/swisstainable.png",
    readingTime: 4,
    tags: ["partnerships", "discover-swiss", "ecosystem"],
  },
];
