export interface CaseStudy {
  id: string;
  name: string;
  fullName: string;
  category: string;
  logo: string;
  heroImage: string;
  chipStats: string[];
  stats: { value: string; label: string; highlight?: boolean }[];
  story: string;
  bullets: string[];
  quote: { text: string; author: string; role: string };
  dashboardType?: number;
  videoUrl?: string;
  videoType?: "youtube" | "local";
  gridScreensImage?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "laax",
    name: "LAAX",
    fullName: "Inside LAAX — LAAX Resort",
    category: "Mobile Commerce & Gamification",
    logo: "/images/logos/laax.svg",
    heroImage: "/images/cases/laax-hero.jpg",
    gridScreensImage: "/images/cases/laax-screens.jpg",
    chipStats: ["200k users", "300% growth", "CHF 19M"],
    stats: [
      { value: "200k", label: "Active app users" },
      { value: "300%", label: "Online sales increase", highlight: true },
      { value: "19M", label: "Revenue (CHF)" },
    ],
    story:
      "LAAX transformed from a traditional ski resort into a digitally-native destination experience. The Inside LAAX app became the single touchpoint for tickets, rentals, loyalty, and real-time mountain conditions — driving a 300% increase in online sales and putting mobile commerce at the centre of the guest journey.",
    bullets: [
      "White-label native app with integrated ticketing and mobile commerce",
      "Gamification layer with challenges, leaderboards, and loyalty rewards",
      "Real-time lift status, snow reports, and personalised push notifications",
      "50% of all ticket sales migrated to in-app purchases",
    ],
    quote: {
      text: "The LAAX app is the platform allowing us to become truly customer centered and to drive digital revenue at scale.",
      author: "Reto Gurtner",
      role: "CEO & President, WAG",
    },
    dashboardType: 2,
  },
  {
    id: "zermatt",
    name: "Zermatt",
    fullName: "Zermatt Bergbahnen — Matterhorn",
    category: "Digital Guest Companion",
    logo: "/images/logos/zermatt.svg",
    heroImage: "/images/cases/zermatt-hero.jpg",
    gridScreensImage: "/images/cases/zermatt-screens.jpg",
    chipStats: ["116k downloads", "2.6M+ interactions", "4+ stars"],
    stats: [
      { value: "116k", label: "App downloads" },
      { value: "2.6M+", label: "Guest interactions", highlight: true },
      { value: "4+", label: "App store rating" },
    ],
    story:
      "Zermatt Bergbahnen needed a digital companion worthy of the Matterhorn. The result: a native app delivering live lift status, piste conditions, and a personalised guest journey — achieving 116k downloads and over 2.6 million interactions in its first seasons.",
    bullets: [
      "Live lift and piste status with real-time mountain data feeds",
      "Interactive trail maps with GPS tracking and elevation profiles",
      "Personalised recommendations based on skill level and weather",
      "Multi-language support for Zermatt's international audience",
    ],
    quote: {
      text: "The digital guest experience now matches the world-class quality of our mountain infrastructure.",
      author: "Markus Hasler",
      role: "CEO, Zermatt Bergbahnen",
    },
    dashboardType: 2,
  },
  {
    id: "estm",
    name: "Engadin",
    fullName: "Engadin & St. Moritz Tourismus",
    category: "Digital Transformation",
    logo: "/images/logos/engadin_logo.svg",
    heroImage: "/images/cases/estm-hero.png",
    chipStats: ["6 sub-projects", "360° CRM", "Headless CMS"],
    stats: [
      { value: "6", label: "Sub-projects delivered" },
      { value: "360°", label: "Guest CRM view", highlight: true },
      { value: "100%", label: "Headless CMS migration" },
    ],
    story:
      "Engadin St. Moritz embarked on a full digital transformation spanning six interconnected sub-projects — from a headless CMS powering all digital touchpoints to a 360° CRM unifying guest data across bookings, activities, and communications.",
    bullets: [
      "Headless CMS architecture powering web, app, and digital signage",
      "Unified 360° guest CRM aggregating data from all channels",
      "Multi-destination content hub serving sub-regions and partners",
      "Integrated commerce layer for events, experiences, and packages",
    ],
    quote: {
      text: "Step by step we can orchestrate the digital customer experience more personalized than ever before.",
      author: "Michael Kirchner",
      role: "Head Digital Management, ESTM",
    },
    dashboardType: 5,
  },
  {
    id: "bikekingdom",
    name: "Bike Kingdom",
    fullName: "Bike Kingdom — Lenzerheide",
    category: "Gamification & Sports Tech",
    logo: "/images/logos/bikekingdom.svg",
    heroImage: "/images/cases/bikekingdom-hero.jpg",
    videoUrl: "https://www.youtube.com/embed/vhhcOTaUVio",
    videoType: "youtube",
    chipStats: ["40k+ downloads", "1k+ DAU", "10.2% conversion"],
    stats: [
      { value: "40k+", label: "App downloads" },
      { value: "1k+", label: "Daily active users", highlight: true },
      { value: "10.2%", label: "Conversion rate" },
    ],
    story:
      "Bike Kingdom turned Lenzerheide into a gamified mountain biking destination. Riders earn XP on trails, compete on leaderboards, and unlock rewards — driving a 10.2% e-commerce conversion rate and a loyal community of 40,000+ users.",
    bullets: [
      "Trail gamification with XP, badges, and seasonal challenges",
      "GPS-tracked rides with automatic segment timing and leaderboards",
      "Integrated e-commerce for day passes, bike rentals, and gear",
      "Community features connecting riders and sharing trail conditions",
    ],
    quote: {
      text: "Creating a unique symbiosis between the real and digital world for every mountain biker.",
      author: "Marc Schlüssel",
      role: "VP, Lenzerheide Marketing",
    },
    dashboardType: 1,
  },
  {
    id: "schwyz",
    name: "Schwyz",
    fullName: "Schwyz Tourismus",
    category: "Data & Analytics",
    logo: "/images/logos/schwyz.svg",
    heroImage: "/images/cases/schwyz-hero.png",
    chipStats: ["Multi-region KPI", "4 phases", "Data-driven"],
    stats: [
      { value: "4", label: "Implementation phases" },
      { value: "12+", label: "KPI dashboards", highlight: true },
      { value: "100%", label: "Data-driven decisions" },
    ],
    story:
      "Schwyz Tourismus partnered with Inside Labs to build a multi-region analytics platform spanning four phases — from KPI definition and data integration to automated dashboards that transformed how the region measures tourism performance.",
    bullets: [
      "Multi-region KPI framework aligning diverse tourism stakeholders",
      "Automated dashboards consolidating data from 12+ sources",
      "Phased rollout ensuring adoption at every organisational level",
      "Predictive models for visitor flow and seasonal demand planning",
    ],
    quote: {
      text: "The dashboard creates a data-based foundation for groundbreaking decisions across our entire region.",
      author: "Vendelin Coray",
      role: "CEO, Schwyz Tourismus",
    },
    dashboardType: 4,
  },
  {
    id: "surselva",
    name: "mia Surselva",
    fullName: "mia SURSELVA — Regional Guest Platform",
    category: "Regional Guest Platform",
    logo: "",
    heroImage: "/images/cases/surselva-hero.jpg",
    chipStats: ["Digital guest card", "Integrated shop", "Explore feed"],
    stats: [
      { value: "1", label: "Unified guest card" },
      { value: "50+", label: "Partner integrations", highlight: true },
      { value: "24/7", label: "Digital concierge" },
    ],
    story:
      "mia SURSELVA created a regional guest platform unifying the entire Surselva region under one digital experience — a guest card with integrated benefits, a discovery feed for activities, and a shop connecting visitors to local partners.",
    bullets: [
      "Digital guest card with automatic benefit activation on check-in",
      "Integrated regional shop for activities, transport, and experiences",
      "Explore feed with personalised recommendations by location and interest",
      "Membership tier system rewarding repeat visitors across the region",
    ],
    quote: {
      text: "Leveraging the technological capabilities of Omni Suite, we built an innovative digital ecosystem for the entire region.",
      author: "Kevin Brunold",
      role: "CEO, Surselva Tourismus",
    },
    dashboardType: 3,
  },
];
