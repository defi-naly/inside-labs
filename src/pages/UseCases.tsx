import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ImpactSection from "@/components/ImpactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n";

const UseCases = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />
      <PageHero
        image="/images/usecases-hero.jpg"
        eyebrow={t("pages.useCases.eyebrow")}
        headline={t("pages.useCases.headline")}
        subtitle={t("pages.useCases.subtitle")}
        imagePosition="top"
      />
      <ImpactSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default UseCases;
