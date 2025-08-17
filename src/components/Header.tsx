
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-morocco-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/6a837879-48e5-4a0a-8bcf-6c8c9b2816fe.png" 
              alt="Institut Souss Al-'Ālima Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-morocco-700 hover:text-morocco-800 font-medium transition-colors">
              Accueil
            </a>
            <a href="#methode" className="text-morocco-700 hover:text-morocco-800 font-medium transition-colors">
              Méthodologie
            </a>
            <a href="#riwayat" className="text-morocco-700 hover:text-morocco-800 font-medium transition-colors">
              Riwāyāt
            </a>
            <a href="#encadrement" className="text-morocco-700 hover:text-morocco-800 font-medium transition-colors">
              Encadrement
            </a>
            <Button 
              className="bg-morocco-600 hover:bg-morocco-700 text-white"
              onClick={() => window.open('https://wa.me/212628824478', '_blank')}
            >
              S'inscrire
            </Button>
          </nav>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
