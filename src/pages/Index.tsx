
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PresentationSection from "@/components/PresentationSection";
import CursusSection from "@/components/CursusSection";
import MethodologySection from "@/components/MethodologySection";
import RiwayatSection from "@/components/RiwayatSection";
import EncadrementSection from "@/components/EncadrementSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PresentationSection />
      <CursusSection />
      <MethodologySection />
      <RiwayatSection />
      <EncadrementSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
