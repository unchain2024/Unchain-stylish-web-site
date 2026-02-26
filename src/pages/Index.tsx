import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BusinessSection from "@/components/BusinessSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsSection from "@/components/NewsSection";
import RecruitingSection from "@/components/RecruitingSection";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BusinessSection />
      <FeaturesSection />
      <NewsSection />
      <RecruitingSection />
      <Footer />
    </div>
  );
};

export default Index;
