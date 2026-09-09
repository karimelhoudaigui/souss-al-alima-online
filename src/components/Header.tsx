
import { useState } from "react";
import { ExternalLink, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/assets";
import { FACEBOOK_URL, getWhatsAppLink, INSTAGRAM_URL } from "@/lib/contact";
import { languages, useLanguage } from "@/lib/i18n";

const navItems = [
  { href: "#accueil" },
  { href: "#cursus" },
  { href: "#methode" },
  { href: "#riwayat" },
  { href: "#encadrement" },
  { href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-morocco-950/70 px-3 shadow-2xl backdrop-blur-xl sm:px-5">
          <a href="#accueil" className="flex items-center space-x-3">
            <img 
              src={assetPath("/lovable-uploads/6a837879-48e5-4a0a-8bcf-6c8c9b2816fe.png")}
              alt="Institut Souss Al-'Ālima Logo" 
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-amiri text-base font-bold text-white">معهد سوس العالمة</p>
              <p className="text-xs font-medium text-white/65">{t.header.institute}</p>
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-5">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {t.header.nav[index]}
              </a>
            ))}
            <div className="flex items-center rounded-full border border-white/10 bg-white/[0.08] p-1" aria-label={t.header.language}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                    language === item.code
                      ? "bg-white text-morocco-950"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <Button asChild className="bg-white text-morocco-950 hover:bg-morocco-50">
              <a href={getWhatsAppLink(t.contact.messages.inscription)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t.header.enroll}
              </a>
            </Button>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50 flex h-10 w-10 shrink-0 lg:hidden text-white hover:bg-white/10 hover:text-white active:scale-90 transition-transform"
            aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setIsOpen((open) => !open)}
          >
            <Menu className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <X className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`} />
          </Button>
        </div>

        <div
          className={`absolute inset-x-0 top-0 z-40 h-screen w-full bg-morocco-950/98 backdrop-blur-xl transition-all duration-500 ease-out lg:hidden ${
            isOpen ? "opacity-100" : "pointer-events-none h-0 opacity-0"
          }`}
        >
          <nav
            className={`flex h-full flex-col justify-center px-8 transition-all delay-100 duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-4 text-3xl font-medium text-white/90 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t.header.nav[index]}
                </a>
              ))}
              <div className="mt-5 flex w-max items-center rounded-full border border-white/10 bg-white/[0.08] p-1" aria-label={t.header.language}>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      language === item.code
                        ? "bg-white text-morocco-950"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  <ExternalLink className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
              <Button asChild className="mt-6 rounded-full bg-white px-8 py-6 text-base font-medium text-morocco-950 hover:bg-morocco-50 hover:scale-105 transition-transform">
                <a
                  href={getWhatsAppLink(t.contact.messages.inscription)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.header.enrollWhatsapp}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
