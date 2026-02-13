import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import AwardsBar from "@/components/about/AwardsBar";
import StatsHero from "@/components/about/StatsHero";
import OriginStory from "@/components/about/OriginStory";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n";

const About = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />
      <PageHero
        image="/images/about-hero.png"
        eyebrow={t("pages.about.eyebrow")}
        headline={t("pages.about.headline")}
        subtitle={t("pages.about.subtitle")}
      />
      <AwardsBar />
      <StatsHero />
      <OriginStory />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default About;
