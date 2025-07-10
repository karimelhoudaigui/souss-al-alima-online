
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, BookOpen, FileText, School, Clock, MapPin, User } from "lucide-react";

const MethodologySection = () => {
  const methodFeatures = [
    {
      icon: School,
      title: "Mémorisation accompagnée",
      description: "Apprentissage progressif avec suivi personnalisé selon la méthode traditionnelle",
      color: "morocco"
    },
    {
      icon: BookOpen,
      title: "Correction individuelle",
      description: "Murājaʿa et taṣḥīḥ pour perfectionner votre récitation",
      color: "sage"
    },
    {
      icon: FileText,
      title: "Écriture coranique",
      description: "Maîtrise du Rasm wa Dabt conforme au muṣḥaf",
      color: "morocco"
    },
    {
      icon: Book,
      title: "Étude du Tajwīd",
      description: "Apprentissage détaillé des règles à travers les textes classiques",
      color: "sage"
    }
  ];

  return (
    <section id="methode" className="py-20 bg-gradient-to-br from-sage-50 to-morocco-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Notre Méthodologie
          </h2>
          <div className="w-24 h-1 bg-sage-600 mx-auto mb-8"></div>
          <p className="text-xl text-sage-700 max-w-3xl mx-auto">
            Nous reprenons la méthode traditionnelle avec la <strong className="text-morocco-700">lūḥa</strong> (tablette), adaptée pour l'enseignement en ligne
          </p>
        </div>
        
        {/* Image illustrative de la méthode traditionnelle */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <img 
              src="/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd.png"
              alt="Enseignement traditionnel avec la lūḥa (tablette) - Méthode ancestrale d'apprentissage du Coran"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-lg font-medium text-center bg-black/40 backdrop-blur-sm rounded-lg p-3">
                L'enseignement traditionnel avec la lūḥa, adapté pour l'ère numérique
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methodFeatures.map((feature, index) => (
            <Card key={index} className={`border-${feature.color}-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-3 rounded-full ${feature.color === 'morocco' ? 'bg-morocco-100' : 'bg-sage-100'}`}>
                  <feature.icon className={`h-8 w-8 ${feature.color === 'morocco' ? 'text-morocco-600' : 'text-sage-600'}`} />
                </div>
                <CardTitle className={`text-lg ${feature.color === 'morocco' ? 'text-morocco-800' : 'text-sage-800'}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600 text-center text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Onglets pour les formations */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="general">Formation Générale</TabsTrigger>
            <TabsTrigger value="supervision">Cours avec Supervision</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-morocco-800 mb-6 text-center">
                Enseignement théorique et pratique
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-morocco-700 mb-4">Théorique</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-morocco-500 mr-2">•</span>
                      <span className="text-sage-700">Étude de <em>Tuhfat al-Aṭfāl</em></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-morocco-500 mr-2">•</span>
                      <span className="text-sage-700">Apprentissage d'<em>al-Jazariyya</em></span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-sage-700 mb-4">Pratique</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-sage-500 mr-2">•</span>
                      <span className="text-sage-700">Suivi personnalisé en mémorisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-500 mr-2">•</span>
                      <span className="text-sage-700">Application concrète du tajwīd</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-500 mr-2">•</span>
                      <span className="text-sage-700">Maîtrise de l'écriture coranique</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="supervision">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-morocco-800 mb-6">
                    Formation sous supervision
                  </h3>
                  
                  <div className="mb-6">
                    <p className="text-lg text-sage-700 mb-4">
                      L'Institut Souss Al-'Ālima propose des cours théoriques et pratiques en{" "}
                      <span className="font-amiri text-xl text-morocco-600">رواية ورش من طريق يوسف الأرزاق</span>, 
                      conformément à la tradition des écoles marocaines.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-morocco-700 mb-3 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Sous la supervision de :
                    </h4>
                    <div className="bg-morocco-50 p-4 rounded-lg">
                      <p className="font-bold text-morocco-800">Pr. Ahmed Benmhan</p>
                      <p className="text-sage-700 text-sm">
                        Professeur de تجويد et producteur de programmes à la Radio Mohammed VI du Saint Coran
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sage-700">
                      <Clock className="h-5 w-5 text-morocco-600 mr-3" />
                      <span>Chaque jeudi à 21h00 (heure du Maroc)</span>
                    </div>
                    <div className="flex items-center text-sage-700">
                      <MapPin className="h-5 w-5 text-morocco-600 mr-3" />
                      <span>En ligne via Zoom</span>
                    </div>
                    <div className="bg-sage-100 p-3 rounded-lg">
                      <p className="text-sm text-sage-700">
                        <strong>Début :</strong> À partir du mois de juillet (شهر 7)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/f0440189-3dc2-43a1-bb41-ebd48c38f96c.png"
                      alt="Professeur Ahmed Benmhan"
                      className="w-80 h-auto rounded-2xl shadow-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MethodologySection;
