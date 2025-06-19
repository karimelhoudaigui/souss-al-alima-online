import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const RiwayatSection = () => {
  const riwayat = [{
    name: "Ḥafṣ ʿan ʿĀṣim",
    arabicName: "حفص عن عاصم",
    description: "La lecture la plus répandue dans le monde musulman",
    origin: "Riwāya de Kufa, Irak",
    features: ["Lecture simplifiée", "Largement enseignée", "Accessible aux débutants"]
  }, {
    name: "Qālūn ʿan Nāfiʿ",
    arabicName: "قالون عن نافع",
    description: "Une des deux transmissions de l'Imam Nāfiʿ",
    origin: "École de Médine",
    features: ["Tradition médinoise", "Précision articulatoire", "Méthode classique"]
  }, {
    name: "Warsh ʿan Nāfiʿ",
    arabicName: "ورش عن نافع",
    description: "Spécialité de notre institut - par Ṭarīq Yūsuf al-Arzāq",
    origin: "École marocaine traditionnelle",
    features: ["Tradition maghrébine", "Méthode de Sidi Mokhtār", "Enseignement spécialisé"],
    highlight: true
  }];
  return <section id="riwayat" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Nos Riwāyāt proposées
          </h2>
          <div className="w-24 h-1 bg-morocco-600 mx-auto mb-8"></div>
          <p className="text-xl text-sage-700 max-w-3xl mx-auto">
            Trois traditions de récitation authentiques, adaptées à différents niveaux d'apprentissage
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {riwayat.map((riwaya, index) => <Card key={index} className={`transition-all duration-300 hover:-translate-y-2 ${riwaya.highlight ? 'border-morocco-300 bg-gradient-to-br from-morocco-50 to-sage-50 shadow-lg ring-2 ring-morocco-200' : 'border-sage-200 hover:shadow-lg'}`}>
              <CardHeader className="text-center pb-4">
                <div className="font-amiri text-3xl text-morocco-600 mb-2">
                  {riwaya.arabicName}
                </div>
                <CardTitle className={`text-xl ${riwaya.highlight ? 'text-morocco-800' : 'text-sage-800'}`}>
                  {riwaya.name}
                </CardTitle>
                <CardDescription className="text-sage-600">
                  {riwaya.origin}
                </CardDescription>
                {riwaya.highlight && <div className="bg-morocco-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Notre spécialité
                  </div>}
              </CardHeader>
              <CardContent>
                <p className="text-sage-700 mb-4 text-center">
                  {riwaya.description}
                </p>
                
              </CardContent>
            </Card>)}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-morocco-100 to-sage-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-morocco-800 mb-4 text-center">
            Pour qui ?
          </h3>
          <p className="text-lg text-sage-700 text-center mb-6">
            Ce programme s'adresse aux francophones, hommes et femmes, souhaitant :
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-morocco-500 mr-2">✓</span>
                <span className="text-sage-700">Apprendre ou perfectionner leur lecture coranique</span>
              </li>
              <li className="flex items-start">
                <span className="text-morocco-500 mr-2">✓</span>
                <span className="text-sage-700">Mémoriser le Coran selon la tradition authentique</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-morocco-500 mr-2">✓</span>
                <span className="text-sage-700">S'initier à l'écriture coranique (Rasm ʿUthmānī)</span>
              </li>
              <li className="flex items-start">
                <span className="text-morocco-500 mr-2">✓</span>
                <span className="text-sage-700">Suivre un enseignement enraciné dans la tradition malékite</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};
export default RiwayatSection;