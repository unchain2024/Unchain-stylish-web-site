import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import BusinessSection from "@/components/BusinessSection";
import MissionSection from "@/components/MissionSection";

import NewsSection from "@/components/NewsSection";
import BlogSection from "@/components/BlogSection";
import PartnersSection from "@/components/PartnersSection";
import RecruitingSection from "@/components/RecruitingSection";
import ContactSection from "@/components/ContactSection";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO organization type="website" />
      <Navigation />
      <HeroSection />
      <MissionSection />
      <BusinessSection />

      <NewsSection />
      <BlogSection />
      <PartnersSection />
      <RecruitingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
