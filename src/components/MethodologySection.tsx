import {
  ArrowRight,
  BookOpen,
  FileText,
  Repeat2,
  School,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const stepIcons = [School, BookOpen, FileText, Repeat2];

const MethodologySection = () => {
  const { t } = useLanguage();

  return (
    <section id="methode" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute left-0 top-0 h-full w-1/3 bg-[#f8f5ef]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
              {t.methodology.badge}
            </p>
            <h2 className="text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl">
              {t.methodology.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sage-800 sm:text-lg">
              {t.methodology.body}
            </p>

            <div className="mt-8 overflow-hidden rounded-[28px] bg-morocco-950 text-white shadow-2xl">
              <img
                src="/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd-4k.jpeg"
                alt={t.methodology.imageAlt}
                className="h-72 w-full object-cover opacity-78 sm:h-96"
              />
              <div className="border-t border-white/10 p-5">
                <p className="text-sm uppercase text-white/45">{t.methodology.imageBadge}</p>
                <p className="mt-2 text-lg font-semibold leading-snug">
                  {t.methodology.imageText}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {t.methodology.steps.map((step, index) => {
              const Icon = stepIcons[index];

              return (
                <div
                  key={step[0]}
                  className="group grid gap-5 rounded-[24px] border border-sage-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-morocco-300 hover:shadow-xl sm:grid-cols-[80px_1fr_auto] sm:items-center sm:p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f5ef] text-morocco-800">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase text-sage-500">
                      {t.methodology.step} {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-morocco-950">
                      {step[0]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sage-700 sm:text-base">
                      {step[1]}
                    </p>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 text-sage-300 transition-transform group-hover:translate-x-1 group-hover:text-morocco-600 sm:block" />
                </div>
              );
            })}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-sage-900 p-6 text-white shadow-xl">
                <Sparkles className="mb-6 h-6 w-6 text-morocco-200" />
                <p className="text-sm uppercase text-white/45">{t.methodology.studentExperience}</p>
                <p className="mt-2 text-2xl font-semibold leading-tight">
                  {t.methodology.studentText}
                </p>
              </div>
              <div className="rounded-[24px] border border-morocco-200 bg-[#fffaf2] p-6 shadow-sm">
                <p className="font-amiri text-3xl text-morocco-800">
                  العلم بالتلقي
                </p>
                <p className="mt-4 text-sm uppercase text-sage-500">{t.methodology.principle}</p>
                <p className="mt-2 text-lg font-semibold leading-snug text-morocco-950">
                  {t.methodology.principleText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
