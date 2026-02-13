import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import StatsHero from "@/components/about/StatsHero";
import OmniSuiteSection from "@/components/OmniSuiteSection";
import ProductDemoSection from "@/components/ProductDemoSection";
import OmniComparisonSection from "@/components/OmniComparisonSection";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n";

const Product = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />
      <PageHero
        image="/images/product-hero.jpg"
        eyebrow={t("pages.product.eyebrow")}
        headline={t("pages.product.headline")}
        subtitle={t("pages.product.subtitle")}
        imagePosition="center top"
      />
      <StatsHero />
      <OmniSuiteSection />
      <ProductDemoSection />
      <OmniComparisonSection />
      <Footer />
    </main>
  );
};

export default Product;
