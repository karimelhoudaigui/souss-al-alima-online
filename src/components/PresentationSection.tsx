import { ArrowRight, BookMarked, Globe2, MapPin, ShieldCheck } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n";

const pillarIcons = [BookMarked, MapPin, Globe2];

const PresentationSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-morocco-300 to-transparent"></div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[28px] bg-morocco-950 text-white shadow-2xl sm:rounded-[34px]">
            <img
              src={assetPath("/lovable-uploads/souss-hero-4k.jpeg")}
              alt={t.presentation.imageAlt}
              className="h-[430px] w-full object-cover opacity-72 sm:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-morocco-950 via-morocco-950/22 to-transparent"></div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/12 bg-black/35 p-4 backdrop-blur-2xl sm:inset-x-6 sm:bottom-6 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {t.presentation.pillars.map((pillar, index) => {
                  const Icon = pillarIcons[index];

                  return (
                    <div key={pillar[0]} className="min-w-0">
                      <Icon className="mb-3 h-5 w-5 text-morocco-200" />
                      <p className="text-xs uppercase text-white/45">{pillar[0]}</p>
                      <p className="mt-1 truncate text-sm font-semibold text-white">
                        {pillar[1]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-4 text-sm font-semibold uppercase tracking-normal text-morocco-700">
            {t.presentation.badge}
          </p>
          <h2 className="max-w-3xl text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl lg:text-6xl">
            {t.presentation.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sage-800 sm:text-lg">
            {t.presentation.body}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-morocco-200 bg-white p-5 shadow-sm">
              <ShieldCheck className="mb-5 h-6 w-6 text-morocco-700" />
              <p className="text-sm font-semibold uppercase text-sage-600">{t.presentation.objective}</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-morocco-950">
                {t.presentation.objectiveText}
              </p>
            </div>
            <div className="rounded-2xl border border-sage-200 bg-sage-900 p-5 text-white shadow-sm">
              <p className="font-amiri text-4xl text-morocco-100">﷽</p>
              <p className="mt-5 text-sm font-semibold uppercase text-white/45">{t.presentation.approach}</p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                {t.presentation.approachText}
              </p>
            </div>
          </div>

          <a
            href="#cursus"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-morocco-950 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            {t.presentation.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
