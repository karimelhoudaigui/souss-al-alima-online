
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PresentationSection from "@/components/PresentationSection";
import MethodologySection from "@/components/MethodologySection";
import ArabeSection from "@/components/ArabeSection";
import RiwayatSection from "@/components/RiwayatSection";
import EncadrementSection from "@/components/EncadrementSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PresentationSection />
      <MethodologySection />
      <ArabeSection />
      <RiwayatSection />
      <EncadrementSection />
      <Footer />
    </div>
  );
};

export default Index;
