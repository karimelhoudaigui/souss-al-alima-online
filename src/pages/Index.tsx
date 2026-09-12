
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CursusSection from "@/components/CursusSection";
import MethodologySection from "@/components/MethodologySection";
import RiwayatSection from "@/components/RiwayatSection";
import EncadrementSection from "@/components/EncadrementSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Header />
      <HeroSection />
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
