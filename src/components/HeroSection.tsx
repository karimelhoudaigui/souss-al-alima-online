import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { getWhatsAppLink } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLanguage();

  return <section id="accueil" className="relative flex min-h-screen w-full overflow-hidden bg-morocco-950 text-white">
      <img
        src={assetPath("/lovable-uploads/souss-hero-4k.jpeg")}
        alt={t.hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[55%_center] opacity-75"
      />
      <div className="absolute inset-0 bg-morocco-950/45"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-morocco-950 via-morocco-950/78 to-morocco-950/25"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-morocco-950/95 via-transparent to-morocco-950/55"></div>
      
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-end px-5 pb-9 pt-28 sm:px-8 sm:pb-12 md:px-12 lg:px-16 lg:pb-16">
        <div className="mb-auto mt-20 max-w-3xl sm:mt-24 lg:mt-28">
          <span className="mb-5 block text-sm font-medium text-morocco-100/90 drop-shadow animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl font-medium leading-[1.05] text-white drop-shadow-2xl sm:text-6xl lg:text-7xl animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            {t.hero.title[0]}
            <br />
            {t.hero.title[1]}
            <br />
            {t.hero.title[2]}
          </h1>
        </div>

        <div className="grid gap-6 sm:max-w-xl lg:grid-cols-[1fr_auto] lg:max-w-5xl lg:items-end">
          <p className="max-w-lg text-sm leading-relaxed text-white/65 sm:text-base md:text-lg animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            {t.hero.body}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <a
              href={getWhatsAppLink(t.contact.messages.inscription)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-morocco-950 shadow-xl transition-transform hover:scale-105 hover:bg-morocco-50"
            >
              <MessageCircle className="h-5 w-5 text-morocco-950" />
              {t.hero.enroll}
            </a>
            <a
              href="#cursus"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <BookOpen className="h-5 w-5 text-white" />
              {t.hero.seeCursus}
              <ArrowRight className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
