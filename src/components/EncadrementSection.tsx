
import { Card, CardContent } from "@/components/ui/card";

const EncadrementSection = () => {
  return (
    <section id="encadrement" className="py-20 bg-gradient-to-br from-sage-50 to-morocco-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-800 mb-6">
            Encadrement
          </h2>
          <div className="w-24 h-1 bg-sage-600 mx-auto mb-8"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-morocco-200 shadow-xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-morocco-100 to-sage-100 rounded-full flex items-center justify-center">
                  <div className="font-amiri text-4xl text-morocco-600">ح.ج</div>
                </div>
                <h3 className="text-3xl font-bold text-morocco-800 mb-2">
                  Hussein Jbara
                </h3>
                <p className="text-xl text-sage-600 mb-6">
                  Professeur de Coran à Sidi Mokhtār
                </p>
              </div>
              
              <div className="space-y-6 text-lg text-sage-700 leading-relaxed">
                <p>
                  <strong className="text-morocco-700">Hussein Jbara</strong> est un enseignant reconnu du Coran, 
                  formé dans la tradition authentique de l'école coranique de Sidi Mokhtār. 
                  Spécialiste de la récitation coranique et de la pédagogie traditionnelle, 
                  il apporte à nos étudiants une expertise approfondie et un accompagnement bienveillant.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-morocco-700">Expertise</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-morocco-500 mr-2">•</span>
                        <span>Récitation coranique traditionnelle</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-morocco-500 mr-2">•</span>
                        <span>Pédagogie des écoles coraniques</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-morocco-500 mr-2">•</span>
                        <span>Riwāya Warsh ʿan Nāfiʿ</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-sage-700">Méthode</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-sage-500 mr-2">•</span>
                        <span>Rigueur et bienveillance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage-500 mr-2">•</span>
                        <span>Suivi personnalisé</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sage-500 mr-2">•</span>
                        <span>Transmission authentique</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-morocco-50 to-sage-50 rounded-lg">
                  <p className="text-center font-medium text-morocco-700">
                    "L'enseignement du Coran est un dépôt sacré qui demande patience, humilité et dévouement. 
                    Nous nous efforçons de transmettre cette noble science avec la même rigueur et la même passion 
                    que nos maîtres nous ont enseignées."
                  </p>
                  <p className="text-center text-sage-600 mt-2 text-sm">
                    - Hussein Jbara
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EncadrementSection;
