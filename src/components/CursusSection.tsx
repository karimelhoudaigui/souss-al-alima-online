import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, FileText, School, Clock, MapPin, User, Users, Languages, PenTool } from "lucide-react";

const CursusSection = () => {
  const coranFeatures = [
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

  const riwayat = [
    {
      title: "رواية ورش من طريق يوسف الأرزاق",
      description: "La lecture traditionnelle du Maghreb, enseignée selon la méthode ancestrale",
      details: ["Transmission authentique", "Méthode marocaine", "Certification reconnue"]
    },
    {
      title: "رواية حفص عن عاصم",
      description: "La lecture la plus répandue dans le monde musulman",
      details: ["Lecture universelle", "Facilité d'apprentissage", "Ressources abondantes"]
    },
    {
      title: "رواية قالون عن نافع",
      description: "Une des lectures médinoises historiques",
      details: ["Tradition médinoise", "Proximité avec Warsh", "Étude comparative"]
    },
    {
      title: "Autres Riwāyāt",
      description: "Possibilité d'étudier d'autres lectures selon la demande",
      details: ["Enseignement personnalisé", "Selon disponibilité", "Étude approfondie"]
    }
  ];

  return (
    <section id="cursus" className="py-20 bg-gradient-to-br from-sage-50 to-morocco-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Nos Cursus de Formation
          </h2>
          <div className="w-24 h-1 bg-sage-600 mx-auto mb-8"></div>
        </div>

        <Tabs defaultValue="coran" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="coran">Cursus Coran</TabsTrigger>
            <TabsTrigger value="arabe">Cursus Arabe</TabsTrigger>
          </TabsList>

          {/* Cursus Coran */}
          <TabsContent value="coran">
            <div className="space-y-12">
              {/* Méthodologie */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-morocco-800 mb-8 text-center">
                  Méthodologie d'enseignement
                </h3>
                
                {/* Image illustrative */}
                <div className="mb-8">
                  <div className="relative rounded-xl overflow-hidden shadow-xl max-w-3xl mx-auto">
                    <img 
                      src="/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd.png" 
                      alt="Enseignement traditionnel avec la lūḥa" 
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coranFeatures.map((feature, index) => (
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
              </div>

              {/* Riwāyāt */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-morocco-800 mb-8 text-center">
                  Riwāyāt Enseignées
                </h3>
                
                <div className="mb-8">
                  <img 
                    src="/lovable-uploads/52f4854d-35b0-4f5f-a86a-0c41daedb49d.png" 
                    alt="Manuscrit coranique ancien" 
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {riwayat.map((riwaya, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg font-amiri text-morocco-800">
                          {riwaya.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sage-700 mb-4">{riwaya.description}</p>
                        <ul className="space-y-2">
                          {riwaya.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-morocco-500 mr-2">•</span>
                              <span className="text-sage-600 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Encadrement */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-morocco-800 mb-8 text-center">
                  Encadrement Pédagogique
                </h3>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-sage-700 mb-6">
                      L'Institut Souss Al-'Ālima propose des cours théoriques et pratiques en{" "}
                      <span className="font-amiri text-xl text-morocco-600">رواية ورش من طريق يوسف الأرزاق</span>, 
                      conformément à la tradition des écoles marocaines.
                    </p>

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

                {/* Théorique et Pratique */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
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
            </div>
          </TabsContent>

          {/* Cursus Arabe */}
          <TabsContent value="arabe">
            <div className="space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-morocco-800 mb-4">
                    Séminaires de Grammaire Arabe
                  </h3>
                  <div className="w-20 h-1 bg-sage-600 mx-auto mb-6"></div>
                  <p className="text-lg text-sage-700 max-w-3xl mx-auto">
                    Des séminaires de grammaire arabe seront enseignés selon la méthodologie des écoles traditionnelles 
                    de la région du Souss (Sud du Maroc).
                  </p>
                </div>

                {/* Image principale */}
                <div className="mb-12">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
                    <img 
                      src="/lovable-uploads/3a077fe5-1c67-4d03-b9cd-3c07ecc5027d.png" 
                      alt="Manuscrit de grammaire arabe classique" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-lg font-medium text-center bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        L'étude de la langue arabe selon la tradition séculaire du Souss
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contenu des cours */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="border-morocco-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-morocco-100">
                        <Book className="h-10 w-10 text-morocco-600" />
                      </div>
                      <CardTitle className="text-xl text-morocco-800">Cours Théorique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sage-700 text-center">
                        Explication du célèbre manuel de grammaire <span className="font-amiri text-lg">الآجرومية</span> (Al-Ajroumiya), 
                        selon la méthode rigoureuse et progressive propre aux écoles anciennes du Souss.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-sage-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-sage-100">
                        <PenTool className="h-10 w-10 text-sage-600" />
                      </div>
                      <CardTitle className="text-xl text-sage-800">Cours Pratique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sage-700 text-center">
                        Analyse grammaticale appliquée sur des passages du <span className="font-amiri text-lg">حزب راتب</span> "Hizb Râtib", 
                        issu du Coran, pour ancrer les règles à travers des exemples vivants.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-morocco-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-morocco-100">
                        <Languages className="h-10 w-10 text-morocco-600" />
                      </div>
                      <CardTitle className="text-xl text-morocco-800">Lecture Narrative</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sage-700 text-center">
                        Une lecture expressive et rythmée (<span className="font-amiri">السرد</span>) d'extraits de commentaires 
                        de l'Ajroumiya ou de livres classiques, pour développer le goût linguistique.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Enseignant */}
                <div className="bg-gradient-to-r from-morocco-50 to-sage-50 rounded-2xl p-8">
                  <h4 className="text-2xl font-bold text-morocco-800 mb-8 text-center">
                    Encadrement Pédagogique
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="mb-6">
                        <h5 className="text-lg font-semibold text-morocco-700 mb-3 flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Cours animé par :
                        </h5>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                          <p className="font-bold text-xl text-morocco-800 mb-2">
                            Cheikh Sâlih Al-Manqouch As-Soussi
                          </p>
                          <p className="text-sage-700">
                            <span className="font-amiri text-lg">الشيخ صالح المنقوش السوسي</span>
                          </p>
                          <div className="mt-4 p-3 bg-sage-50 rounded-lg">
                            <p className="text-sage-700 text-sm">
                              Professeur à l'école traditionnelle d'Ilmaten (Rasmouka), 
                              héritier de la tradition d'enseignement séculaire du Souss
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sage-700">
                          <MapPin className="h-5 w-5 text-morocco-600 mr-3" />
                          <span>École traditionnelle d'Ilmaten, Rasmouka</span>
                        </div>
                        <div className="bg-morocco-100 p-4 rounded-lg">
                          <p className="text-morocco-800">
                            <strong>Méthodologie :</strong> Transmission orale traditionnelle combinée 
                            aux outils pédagogiques modernes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="relative">
                        <img 
                          src="/lovable-uploads/396e6b69-9424-40e9-9bd9-fff22c3120f3.png" 
                          alt="Cheikh Sâlih Al-Manqouch As-Soussi" 
                          className="w-80 h-auto rounded-2xl shadow-xl object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inscription */}
                <div className="text-center mt-8">
                  <p className="text-lg text-sage-700 mb-6">
                    Rejoignez une tradition d'excellence dans l'enseignement de la langue arabe
                  </p>
                  <button 
                    onClick={() => window.open('https://wa.me/212628824478', '_blank')}
                    className="bg-morocco-600 hover:bg-morocco-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Inscrivez-vous maintenant
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CursusSection;