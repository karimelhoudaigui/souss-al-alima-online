
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PresentationSection from "@/components/PresentationSection";
import CursusSection from "@/components/CursusSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PresentationSection />
      <CursusSection />
      <Footer />
    </div>
  );
};

export default Index;
