import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Languages,
  MessageCircle,
} from "lucide-react";
import { assetPath, videoAssets } from "@/lib/assets";
import { getWhatsAppLink } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

type Cursus = {
  icon: typeof BookOpen;
  arabic: string;
  image: string;
  accent: string;
  supervisor: {
    name: string;
  };
};

const cursus: Cursus[] = [
  {
    icon: BookOpen,
    arabic: "القرآن الكريم",
    image: assetPath("/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd-4k.jpeg"),
    accent: "bg-morocco-500",
    supervisor: {
      name: "Hussein Jbara",
    },
  },
  {
    icon: GraduationCap,
    arabic: "علم التجويد",
    image: assetPath("/lovable-uploads/f0440189-3dc2-43a1-bb41-ebd48c38f96c-4k.jpeg"),
    accent: "bg-sage-500",
    supervisor: {
      name: "Pr. Ahmed Benmhan",
    },
  },
  {
    icon: Languages,
    arabic: "النحو العربي",
    image: assetPath("/lovable-uploads/396e6b69-9424-40e9-9bd9-fff22c3120f3-4k.jpeg"),
    accent: "bg-teal-700",
    supervisor: {
      name: "Cheikh Sâlih Al-Manqouch As-Soussi",
    },
  },
];

const CursusSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useLanguage();
  const selected = cursus[selectedIndex];
  const selectedCopy = t.cursus.items[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <section id="cursus" className="relative overflow-hidden bg-morocco-950 py-20 text-white sm:py-28">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        src={videoAssets.cursus}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath("/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd-4k.jpeg")}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-morocco-950/70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-morocco-950 via-morocco-950/88 to-[#10241f]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-morocco-200">
              {t.cursus.badge}
            </p>
            <h2 className="max-w-2xl text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
              {t.cursus.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg lg:ml-auto">
            {t.cursus.body}
          </p>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-lg font-semibold text-white">{t.cursus.labels.availableTitle}</p>
            <p className="text-sm text-white/50">{t.cursus.labels.availableSub}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {cursus.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              const copy = t.cursus.items[index];

              return (
                <button
                  key={copy.title}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`group relative overflow-hidden rounded-lg border p-5 text-left transition-all duration-300 sm:p-6 ${
                    isSelected
                      ? "border-white bg-white text-morocco-950 shadow-xl"
                      : "border-white/10 bg-white/[0.06] text-white backdrop-blur-xl hover:border-white/25 hover:bg-white/[0.1]"
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 ${item.accent}`}></div>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      isSelected ? "bg-morocco-100 text-morocco-900" : "bg-black/25 text-morocco-100"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowRight className={`mt-3 h-5 w-5 transition-transform ${
                      isSelected ? "text-morocco-700" : "text-white/40 group-hover:translate-x-1 group-hover:text-white"
                    }`} />
                  </div>
                  <p className={`mt-6 font-amiri text-2xl ${isSelected ? "text-morocco-900" : "text-white"}`}>
                    {item.arabic}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{copy.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isSelected ? "text-sage-700" : "text-white/60"}`}>
                    {copy.subtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase">
                    <span className={`rounded-full px-3 py-2 ${isSelected ? "bg-morocco-50 text-morocco-800" : "bg-white/10 text-white/70"}`}>{copy.rhythm}</span>
                    <span className={`rounded-full px-3 py-2 ${isSelected ? "bg-sage-50 text-sage-800" : "bg-white/10 text-white/70"}`}>{copy.level}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#f8f5ef] text-morocco-950 shadow-xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <img
                src={selected.image}
                alt={selectedCopy.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-morocco-950/45 via-transparent to-transparent lg:bg-gradient-to-r"></div>
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-black/35 px-4 py-2 text-white backdrop-blur-xl">
                <SelectedIcon className="h-4 w-4 text-morocco-100" />
                <span className="font-amiri text-lg">{selected.arabic}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-morocco-700">
                  {t.cursus.labels.keyPoints}
                </p>
                <h3 className="mt-3 text-3xl font-medium leading-tight text-morocco-950 sm:text-4xl lg:text-5xl">
                  {selectedCopy.title}
                </h3>
                <p className="mt-3 text-lg font-medium text-morocco-800">
                  {selectedCopy.subtitle}
                </p>
                <p className="mt-5 text-base leading-relaxed text-sage-800 sm:text-lg">
                  {selectedCopy.description}
                </p>
              </div>

              <dl className="mt-8 grid gap-5 border-y border-morocco-200 py-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-sage-500">{t.cursus.labels.rhythm}</p>
                  <p className="mt-2 font-semibold text-morocco-950">{selectedCopy.rhythm}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-sage-500">{t.cursus.labels.level}</p>
                  <p className="mt-2 font-semibold text-morocco-950">{selectedCopy.level}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-sage-500">{t.cursus.labels.outcome}</p>
                  <p className="mt-2 font-semibold text-morocco-950">{selectedCopy.outcome}</p>
                </div>
              </dl>

              <ul className="mt-8 space-y-4">
                {selectedCopy.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-sage-800 sm:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-morocco-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-5 border-t border-morocco-200 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div>
                    <p className="text-sm font-semibold uppercase text-sage-500">{t.cursus.labels.supervision}</p>
                    <p className="mt-1 text-lg font-semibold text-morocco-950">{selected.supervisor.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-sage-700">{selectedCopy.supervisorRole}</p>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(selectedCopy.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-morocco-950 px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.cursus.labels.request}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CursusSection;
