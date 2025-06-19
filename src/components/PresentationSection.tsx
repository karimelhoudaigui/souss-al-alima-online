
import { Card, CardContent } from "@/components/ui/card";

const PresentationSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Présentation de l'Institut
          </h2>
          <div className="w-24 h-1 bg-morocco-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-sage-700 leading-relaxed">
              L'Institut Souss Al-'Ālima est une plateforme francophone dédiée à l'enseignement traditionnel du Coran en ligne. Elle s'inscrit dans la continuité des écoles coraniques marocaines, et propose des cours théoriques et pratiques en <strong className="text-morocco-700">Riwāya Warsh ʿan Nāfiʿ par Ṭarīq Yūsuf al-Arzāq</strong>.
            </p>
            
            <p className="text-lg text-sage-700 leading-relaxed">
              Sous la supervision du professeur <strong className="text-morocco-700">Hussein Jbara</strong>, enseignant à l'école traditionnelle de <strong className="text-morocco-700">Sidi Mokhtār</strong>, nous perpétuons un héritage millénaire d'enseignement coranique.
            </p>
            
            <Card className="border-morocco-200 bg-morocco-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-morocco-800 mb-4">Notre objectif</h3>
                <p className="text-morocco-700">
                  Transmettre un enseignement rigoureux du Coran, alliant théorie et pratique, 
                  dans le respect de la tradition authentique marocaine.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-morocco-100 to-sage-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="font-amiri text-6xl text-morocco-600 mb-4">
                  ﷽
                </div>
                <p className="font-amiri text-2xl text-sage-700">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-morocco-600 mt-2 font-inter">
                  Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
