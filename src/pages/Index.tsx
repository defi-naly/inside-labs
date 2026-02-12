import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import FeatureOutcomesSection from "@/components/FeatureOutcomesSection";
import ProductDemoSection from "@/components/ProductDemoSection";
import ResultsSection from "@/components/ResultsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <ProblemSolutionSection />
      <FeatureOutcomesSection />
      <ProductDemoSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
