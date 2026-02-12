import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ResultsSection from "@/components/ResultsSection";
import ClientsSection from "@/components/ClientsSection";
import OmniSuiteSection from "@/components/OmniSuiteSection";
import ProductCards from "@/components/ProductCards";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ResultsSection />
      <ClientsSection />
      <OmniSuiteSection />
      <ProductCards />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;