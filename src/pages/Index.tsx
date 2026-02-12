import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import OmniSuiteSection from "@/components/OmniSuiteSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <OmniSuiteSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;