import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/assets";
import { getWhatsAppLink } from "@/lib/contact";
import { languages, useLanguage } from "@/lib/i18n";

const navItems = [
  { href: "#accueil", labelIndex: 0 },
  { href: "#cursus", labelIndex: 1 },
  { href: "#methode", labelIndex: 2 },
  { href: "#contact", labelIndex: 5 },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="relative z-50 border-b border-morocco-200 bg-[#fbf8f2]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-10">
        <Link to="/#accueil" className="flex min-w-0 items-center gap-3">
          <img
            src={assetPath("/logo-souss-al-alima.jpeg")}
            alt=""
            className="h-12 w-12 shrink-0 rounded-md object-contain sm:h-14 sm:w-14"
          />
          <div className="leading-tight">
            <p className="font-amiri text-xl font-bold text-morocco-950 sm:text-2xl" dir="rtl">
              معهد سوس العالمة
            </p>
            <p className="hidden text-xs text-sage-700 sm:block">{t.header.institute}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={`/${item.href}`}
              className="text-sm text-sage-800 transition-colors hover:text-morocco-700"
            >
              {t.header.nav[item.labelIndex]}
            </Link>
          ))}
          <Link
          to="/espace-eleves"
          className="border-l border-morocco-200 pl-5 text-sm font-semibold text-morocco-800 transition-colors hover:text-morocco-600"
          >
          {t.header.nav[6]}
          </Link>
          <div className="flex items-center gap-1 border-l border-morocco-200 pl-4" aria-label={t.header.language}>
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                aria-pressed={language === item.code}
                className={`px-1.5 py-1 text-xs transition-colors ${
                  language === item.code ? "font-bold text-morocco-800" : "text-sage-500 hover:text-sage-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Button asChild className="rounded-none bg-morocco-700 px-5 text-white hover:bg-morocco-800">
            <a href={getWhatsAppLink(t.contact.messages.inscription)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t.header.enroll}
            </a>
          </Button>
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center border border-morocco-200 bg-transparent text-morocco-800 lg:hidden"
          aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <Menu className={`absolute h-5 w-5 transition-all ${isOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"}`} />
          <X className={`absolute h-5 w-5 transition-all ${isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-full z-40 border-b border-morocco-200 bg-[#fbf8f2] transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={`/${item.href}`}
              className="border-b border-morocco-100 py-3 font-display text-xl text-morocco-950"
              onClick={() => setIsOpen(false)}
            >
              {t.header.nav[item.labelIndex]}
            </Link>
          ))}
          <Link
          to="/espace-eleves"
          className="border-b border-morocco-100 py-3 font-display text-xl text-morocco-800"
          onClick={() => setIsOpen(false)}
          >
          {t.header.nav[6]}
          </Link>
          <div className="mt-4 flex items-center gap-3" aria-label={t.header.language}>
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                aria-pressed={language === item.code}
                className={`px-2 py-1 text-xs ${language === item.code ? "font-bold text-morocco-800" : "text-sage-500"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href={getWhatsAppLink(t.contact.messages.inscription)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 bg-morocco-700 px-5 text-sm text-white"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle className="h-4 w-4" />
            {t.header.enrollWhatsapp}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
