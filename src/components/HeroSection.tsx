import { ArrowRight, MessageCircle } from "lucide-react";
import { videoAssets } from "@/lib/assets";
import { getWhatsAppLink } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="bg-[#f6f1e8] text-morocco-950"
    >
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-10 lg:py-20">
        <div className="order-2 max-w-2xl lg:order-1">
          <p className="mb-5 text-sm tracking-[0.12em] text-morocco-700">
            {t.hero.badge}
          </p>
          <h1 className="font-display text-5xl font-normal leading-[1.08] sm:text-6xl lg:text-7xl">
            {t.hero.title[0]}{" "}
            <span className="text-morocco-700">{t.hero.title[1]}</span>{" "}
            {t.hero.title[2]}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-sage-800 sm:text-lg">
            {t.hero.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={getWhatsAppLink(t.contact.messages.inscription)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-morocco-700 px-6 py-3 text-sm text-white transition-colors hover:bg-morocco-800"
            >
              <MessageCircle className="h-4 w-4" />
              {t.hero.enroll}
            </a>
            <a
              href="#cursus"
              className="inline-flex items-center gap-2 text-sm text-morocco-800 underline decoration-morocco-300 underline-offset-4 hover:decoration-morocco-700"
            >
              {t.hero.seeCursus}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-10 border-t border-morocco-200 pt-5 font-amiri text-2xl text-morocco-800" dir="rtl">
            وَقُلْ رَبِّ زِدْنِي عِلْمًا
          </p>
        </div>

        <div className="relative order-1 min-h-[300px] overflow-hidden bg-morocco-900 sm:min-h-[420px] lg:order-2 lg:min-h-[620px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoAssets.cursus}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.hero.imageAlt}
          />
          <div className="pointer-events-none absolute inset-0 bg-morocco-950/10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
