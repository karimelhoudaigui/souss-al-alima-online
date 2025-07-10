
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, Briefcase, Award } from "lucide-react";

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
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="/lovable-uploads/52f4854d-35b0-4f5f-a86a-0c41daedb49d.png" 
                    alt="Hussein Jbara" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl font-bold text-morocco-800 mb-2">
                  Hussein Jbara
                </h3>
                <p className="text-xl text-sage-600 mb-6">
                  Professeur de Coran à Sidi Mokhtār
                </p>
              </div>
              
              <div className="space-y-6 text-lg text-sage-700 leading-relaxed mb-8">
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

              {/* Biographie détaillée en onglets */}
              <Tabs defaultValue="scientifique" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="scientifique" className="text-xs">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Scientifique
                  </TabsTrigger>
                  <TabsTrigger value="formation" className="text-xs">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Formation
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Expérience
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="text-xs">
                    <Award className="h-4 w-4 mr-1" />
                    Certifications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="scientifique">
                  <Card className="bg-sage-50 border-sage-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-morocco-700 mb-4">Parcours scientifique</h4>
                      <div className="space-y-4 text-sage-700">
                        <p>
                          Il a mémorisé le Saint Coran dès son jeune âge, complétant sa première khatma (complète récitation) 
                          à l'âge de <strong>14 ans</strong> sous la supervision de son cheikh <strong>Ibrahim Amrah Al-Baamrani</strong>, 
                          l'une des figures éminentes de Souss dans les sciences de la lecture coranique (qira'at), 
                          le rasm (orthographe coranique) et le dhabt (notation exacte). Il est reconnu pour sa maîtrise 
                          et sa rigueur dans les sciences du Coran.
                        </p>
                        <p>
                          Il a poursuivi la maîtrise de la lecture, de la récitation (tajwid), du rasm et du dhabt 
                          en répétant plusieurs khatmas sous la direction du même cheikh.
                        </p>
                        <p>
                          Il a complété la lecture de l'Imam Nafi' selon ses deux narrateurs (Rawis), 
                          <strong> Warsh et Qalun</strong>, conformément à l'usage au Maroc. À l'âge de <strong>18 ans</strong>, 
                          il assistait son cheikh dans la correction des lectures et des tablettes (alwâh) 
                          à l'école As-Sa'idat.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="formation">
                  <Card className="bg-morocco-50 border-morocco-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-sage-700 mb-4">Formation académique</h4>
                      <div className="space-y-4 text-sage-700">
                        <p>
                          Il a étudié à l'école <strong>Agadir Maqouran Guelmim</strong>, une institution qui combine 
                          l'enseignement traditionnel (ta'lim 'atiq) et le système moderne. Elle offre un programme 
                          complet du primaire au baccalauréat avec un accent particulier sur les sciences religieuses.
                        </p>
                        <p>
                          Ensuite, il a rejoint le cheikh <strong>Mohammed Nit Abdallah As-Saysi</strong>, 
                          directeur de l'école Sidi Al-Mukhtar et membre d'une institution relevant du 
                          Conseil Scientifique Local présidé par Sa Majesté le Roi Mohammed VI, Commandeur des Croyants.
                        </p>
                        <p>
                          Sous sa tutelle, il a étudié diverses disciplines des sciences linguistiques arabes : 
                          grammaire (nahw), morphologie (sarf), rhétorique (balagha), métrique ('arud), 
                          ainsi que la logique (sullam al-munawraq d'Al-Akhdari), le fiqh (jurisprudence islamique) 
                          et les usul al-fiqh (fondements du droit). Il a également lu auprès de lui des ouvrages 
                          littéraires et continue de se perfectionner à ce jour.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience">
                  <Card className="bg-sage-50 border-sage-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-morocco-700 mb-4">Expérience professionnelle</h4>
                      <div className="space-y-4 text-sage-700">
                        <p>
                          Actuellement, il enseigne le Coran, le rasm et dhabṭ, ainsi que le tajwid 
                          à l'école <strong>Sidi Al-Mukhtar</strong>.
                        </p>
                        <p>
                          Plusieurs de ses élèves, garçons et filles, ont complété la mémorisation du Coran 
                          à un jeune âge grâce à ses efforts, louange à Dieu.
                        </p>
                        <p>
                          Il a également travaillé auparavant comme enseignant dans un centre affilié 
                          au <strong>Conseil Scientifique Local de Chichaoua</strong>, mais n'a pu poursuivre 
                          en raison de l'éloignement et des déplacements fréquents.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="certifications">
                  <Card className="bg-morocco-50 border-morocco-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-sage-700 mb-4">Certifications et projets</h4>
                      <div className="space-y-4 text-sage-700">
                        <p>
                          Il poursuit actuellement une <strong>Ijazah</strong> (autorisation de transmission) 
                          en qira'at auprès de son cheikh, le <strong>Dr. Abderrahim An-Nabloussi</strong>.
                        </p>
                        <p>
                          Il détient des certificats scientifiques et des Ijazahs en sciences coraniques, 
                          notamment de la part du <strong>Dr. Abdelhadi Hamito</strong>, président du comité 
                          de supervision du Mushaf Muhammadi officiel au Maroc selon la lecture de Warsh 
                          et le rasm wa-dhabt en usage.
                        </p>
                        <p>
                          Il travaille actuellement sur un projet coranique en collaboration avec le 
                          <strong> Dr. Muadh As-Sahabi</strong>, visant à réaliser un Mushaf électronique 
                          spécialisé dans les versets similaires (mutashabihat), sous la supervision du 
                          <strong> Ministère des Habous et des Affaires Islamiques</strong>.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EncadrementSection;
