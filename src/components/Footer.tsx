
import { Book, Calendar, FileText, Folder, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, PHONE_LINK, WHATSAPP_DISPLAY_NUMBER } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const quickLinks = ["#accueil", "#cursus", "#methode", "#riwayat", "#encadrement", "#contact"];
const featureIcons = [Calendar, FileText, Folder, Book];

const Footer = () => {
  const { t } = useLanguage();

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
                <p className="text-sm text-morocco-200">{t.header.institute}</p>
              </div>
            </div>
            <p className="text-morocco-200 text-sm">
              {t.footer.description}
            </p>
          </div>
          
          {/* Fonctionnalités */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">{t.footer.features}</h4>
            <ul className="space-y-2">
              {t.footer.featureItems.map((item, index) => {
                const Icon = featureIcons[index];

                return (
                  <li key={item} className="flex items-center text-morocco-200 text-sm">
                    <Icon className="h-4 w-4 mr-2" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">{t.footer.links}</h4>
            <ul className="space-y-2">
              {quickLinks.map((href, index) => (
                <li key={href}>
                  <a href={href} className="text-morocco-200 hover:text-white text-sm transition-colors">
                    {t.header.nav[index]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-morocco-100">{t.footer.contact}</h4>
            <div className="space-y-4">
              <p className="text-morocco-200 text-sm">
                WhatsApp :{" "}
                <a href={`tel:${PHONE_LINK}`} className="font-semibold hover:text-white">
                  {WHATSAPP_DISPLAY_NUMBER}
                </a>
              </p>
              <Button asChild className="w-full bg-morocco-700 hover:bg-morocco-600 text-white">
                <a href={getWhatsAppLink(t.contact.messages.information)} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-morocco-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-morocco-300 text-sm">
              {t.footer.rights}
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
