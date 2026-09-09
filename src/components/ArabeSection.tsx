import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, MessageSquare } from "lucide-react";

const ArabeSection = () => {
  const coursFeatures = [
    {
      icon: BookOpen,
      title: "Cours théorique",
      description: "Explication du célèbre manuel de grammaire Al-Ajroumiya, selon la méthode rigoureuse et progressive propre aux écoles anciennes du Souss.",
      color: "morocco"
    },
    {
      icon: Users,
      title: "Cours pratique", 
      description: "Analyse grammaticale appliquée sur des passages du \"Hizb Râtib\", issu du Coran, pour ancrer les règles à travers des exemples vivants.",
      color: "sage"
    },
    {
      icon: MessageSquare,
      title: "Lecture narrative (as-sard)",
      description: "Une lecture expressive et rythmée d'extraits de commentaires de l'Ajroumiya ou de livres classiques de la littérature arabe, visant à développer le goût linguistique, la compréhension et l'usage concret de la grammaire.",
      color: "morocco"
    }
  ];

  return (
    <section id="arabe" className="py-20 bg-gradient-to-br from-morocco-50 via-sage-50 to-morocco-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Séminaires de Grammaire Arabe
          </h2>
          <div className="w-24 h-1 bg-morocco-600 mx-auto mb-8"></div>
          <p className="text-lg text-sage-700 max-w-3xl mx-auto leading-relaxed">
            Des séminaires de grammaire arabe seront enseignés selon la méthodologie des écoles traditionnelles de la région du Souss (Sud du Maroc).
          </p>
        </div>

        {/* Grille des caractéristiques des cours */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {coursFeatures.map((feature, index) => (
            <Card key={index} className="border-morocco-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-morocco-800 mb-3">{feature.title}</h3>
                <p className="text-sage-700 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section du professeur */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-morocco-800 mb-4">
                  Votre Formateur
                </h3>
                <div className="w-16 h-1 bg-morocco-600 mb-6"></div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-morocco-700">
                  Cheikh Sâlih Al-Manqouch As-Soussi
                </h4>
                <p className="text-lg text-sage-700">
                  Professeur à l'école traditionnelle d'<strong className="text-morocco-700">Ilmaten (Rasmouka)</strong>
                </p>
                <p className="text-sage-700 leading-relaxed">
                  Érudit reconnu dans l'enseignement de la grammaire arabe selon la méthode traditionnelle du Souss, 
                  le Cheikh Sâlih Al-Manqouch As-Soussi apporte une expertise authentique et une pédagogie éprouvée 
                  dans l'étude de l'Al-Ajroumiya et de la littérature arabe classique.
                </p>
              </div>

              <Card className="border-morocco-200 bg-morocco-50">
                <CardContent className="p-6">
                  <div className="font-amiri text-lg text-morocco-700 mb-2">
                    النحو أساس العلوم العربية
                  </div>
                  <p className="text-morocco-600 italic">
                    "La grammaire est le fondement des sciences arabes"
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/lovable-uploads/396e6b69-9424-40e9-9bd9-fff22c3120f3-4k.jpeg" 
                  alt="Cheikh Sâlih Al-Manqouch As-Soussi"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-morocco-900/20 to-transparent"></div>
              </div>
              
              {/* Élément décoratif */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-morocco-600 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-sage-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArabeSection;
