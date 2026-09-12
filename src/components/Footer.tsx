import { ExternalLink, Instagram, MessageCircle } from "lucide-react";
import {
  FACEBOOK_URL,
  getWhatsAppLink,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY_NUMBER,
} from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const quickLinks = [
  { href: "#accueil", labelIndex: 0 },
  { href: "#cursus", labelIndex: 1 },
  { href: "#methode", labelIndex: 2 },
  { href: "#contact", labelIndex: 5 },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-morocco-950 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-start">
          <div>
            <p className="font-amiri text-2xl font-bold">معهد سوس العالمة</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
              {t.footer.description}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-white/65">
            {quickLinks.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {t.header.nav[item.labelIndex]}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a
              href={getWhatsAppLink(t.contact.messages.information)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-morocco-950 hover:bg-morocco-50"
            >
              <MessageCircle className="h-4 w-4" />
              {WHATSAPP_DISPLAY_NUMBER}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:bg-white/10 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p className="font-amiri">وَقُلْ رَبِّ زِدْنِي عِلْمًا</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
