
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-morocco-50 via-sage-50 to-morocco-100">
      {/* Arabic calligraphy background */}
      <div className="absolute inset-0 opacity-5">
        <div className="font-amiri text-9xl text-morocco-800 absolute top-20 left-10 rotate-12">
          ﷽
        </div>
        <div className="font-amiri text-6xl text-sage-700 absolute bottom-32 right-20 -rotate-6">
          القرآن الكريم
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-morocco-800 mb-6 leading-tight">
            Apprenez le Coran selon la 
            <span className="text-morocco-600"> tradition marocaine</span>, 
            <br />en ligne
          </h1>
          
          <p className="text-xl md:text-2xl text-sage-700 mb-8 font-medium">
            Mémorisation, Tajwīd et écriture (Rasm wa Dabt) – selon la méthode traditionnelle de Sidi Mokhtār
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-morocco-600 hover:bg-morocco-700 text-white px-8 py-3 text-lg">
              Commencer maintenant
            </Button>
            <Button variant="outline" size="lg" className="border-morocco-600 text-morocco-600 hover:bg-morocco-50 px-8 py-3 text-lg">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
