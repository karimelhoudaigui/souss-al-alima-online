
import { Book, Calendar, FileText, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-morocco-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Institut Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-morocco-700 p-2 rounded-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-amiri text-lg font-bold">معهد سوس العالمة</h3>
                <p className="text-sm text-morocco-200">Institut Souss Al-'Ālima</p>
              </div>
            </div>
            <p className="text-morocco-200 text-sm">
              Enseignement traditionnel du Coran en ligne selon la méthode de Sidi Mokhtār
            </p>
          </div>
          
          {/* Fonctionnalités */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">Fonctionnalités</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-morocco-200 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Cours en ligne programmés
              </li>
              <li className="flex items-center text-morocco-200 text-sm">
                <FileText className="h-4 w-4 mr-2" />
                Fiches PDF téléchargeables
              </li>
              <li className="flex items-center text-morocco-200 text-sm">
                <Folder className="h-4 w-4 mr-2" />
                Espace personnel élève
              </li>
              <li className="flex items-center text-morocco-200 text-sm">
                <Book className="h-4 w-4 mr-2" />
                Accès aux vidéos de cours
              </li>
            </ul>
          </div>
          
          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-morocco-200 hover:text-white text-sm transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#methode" className="text-morocco-200 hover:text-white text-sm transition-colors">
                  Méthodologie
                </a>
              </li>
              <li>
                <a href="#riwayat" className="text-morocco-200 hover:text-white text-sm transition-colors">
                  Riwāyāt
                </a>
              </li>
              <li>
                <a href="#encadrement" className="text-morocco-200 hover:text-white text-sm transition-colors">
                  Encadrement
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">Contact</h4>
            <div className="space-y-4">
              <Button 
                className="w-full bg-morocco-700 hover:bg-morocco-600 text-white"
                onClick={() => window.open('https://wa.me/212628824478', '_blank')}
              >
                Nous contacter
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-morocco-600 text-morocco-200 hover:bg-morocco-800"
                onClick={() => window.open('https://wa.me/212628824478', '_blank')}
              >
                S'inscrire maintenant
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-morocco-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-morocco-300 text-sm">
              © 2024 Institut Souss Al-'Ālima. Tous droits réservés.
            </p>
            <div className="font-amiri text-morocco-400 text-sm mt-2 md:mt-0">
              وَقُلْ رَبِّ زِدْنِي عِلْمًا
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
