import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  Languages,
  Layers3,
  MessageCircle,
  Sparkles,
  UserCheck,
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { t } = useLanguage();
  const selected = cursus[selectedIndex];
  const selectedCopy = t.cursus.items[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <section id="cursus" className="relative overflow-hidden bg-morocco-950 py-16 text-white sm:py-24">
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-morocco-950 via-morocco-950/88 to-[#10241f]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-morocco-200 animate-[fadeSlideUp_0.8s_ease_0.1s_both]">
              {t.cursus.badge}
            </p>
            <h2 className="max-w-2xl text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl animate-[fadeSlideUp_0.8s_ease_0.25s_both]">
              {t.cursus.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg lg:ml-auto animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            {t.cursus.body}
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-lg font-semibold text-white">{t.cursus.labels.availableTitle}</p>
            <p className="text-sm text-white/50">{t.cursus.labels.availableSub}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {cursus.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              const copy = t.cursus.items[index];

              return (
                <button
                  key={copy.title}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setDetailsOpen(false);
                  }}
                  className={`group relative overflow-hidden rounded-[24px] border p-4 text-left transition-all duration-300 sm:p-5 ${
                    isSelected
                      ? "border-white bg-white text-morocco-950 shadow-2xl"
                      : "border-white/10 bg-white/[0.08] text-white backdrop-blur-xl hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12]"
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 ${item.accent}`}></div>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isSelected ? "bg-morocco-100 text-morocco-900" : "bg-black/25 text-morocco-100"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowRight className={`mt-3 h-5 w-5 transition-transform ${
                      isSelected ? "text-morocco-700" : "text-white/40 group-hover:translate-x-1 group-hover:text-white"
                    }`} />
                  </div>
                  <p className={`mt-5 font-amiri text-2xl ${isSelected ? "text-morocco-900" : "text-white"}`}>
                    {item.arabic}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{copy.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isSelected ? "text-sage-700" : "text-white/60"}`}>
                    {copy.subtitle}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold uppercase">
                    <span className={`rounded-full px-3 py-2 ${isSelected ? "bg-morocco-50 text-morocco-800" : "bg-white/10 text-white/70"}`}>
                      {copy.rhythm}
                    </span>
                    <span className={`rounded-full px-3 py-2 ${isSelected ? "bg-sage-50 text-sage-800" : "bg-white/10 text-white/70"}`}>
                      {copy.level}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-ticker gap-3">
            {[...t.cursus.ticker, ...t.cursus.ticker].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-medium uppercase text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-stretch">
          <div className="relative min-h-[580px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-2xl sm:rounded-[36px]">
            <div
              className="absolute inset-[-20%] opacity-25 animate-spin-bg"
              style={{
                background:
                  "conic-gradient(from 90deg, rgba(194,97,12,0.75), rgba(20,83,45,0.55), rgba(15,118,110,0.5), rgba(194,97,12,0.75))",
              }}
            ></div>
            <img
              src={selected.image}
              alt={selectedCopy.title}
              className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-morocco-950 via-morocco-950/88 to-morocco-950/35"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-morocco-950 via-transparent to-transparent"></div>

            <div className="relative flex min-h-[580px] flex-col justify-between p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                {cursus.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndex === index;

                  return (
                    <button
                      key={t.cursus.items[index].title}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(index);
                        setDetailsOpen(false);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-white bg-white text-morocco-950 shadow-xl"
                          : "border-white/12 bg-white/[0.08] text-white/70 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {t.cursus.items[index].title}
                    </button>
                  );
                })}
              </div>

              <div className="mt-16 max-w-3xl sm:mt-24">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
                  <SelectedIcon className="h-4 w-4 text-morocco-200" />
                  <span className="font-amiri text-lg text-white">{selected.arabic}</span>
                </div>
                <h3 className="text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
                  {selectedCopy.title}
                </h3>
                <p className="mt-4 text-lg font-medium text-morocco-100">
                  {selectedCopy.subtitle}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
                  {selectedCopy.description}
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                  <CalendarClock className="mb-4 h-5 w-5 text-morocco-200" />
                  <p className="text-xs uppercase text-white/45">{t.cursus.labels.rhythm}</p>
                  <p className="mt-1 font-semibold text-white">{selectedCopy.rhythm}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                  <Layers3 className="mb-4 h-5 w-5 text-sage-200" />
                  <p className="text-xs uppercase text-white/45">{t.cursus.labels.level}</p>
                  <p className="mt-1 font-semibold text-white">{selectedCopy.level}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                  <Sparkles className="mb-4 h-5 w-5 text-teal-200" />
                  <p className="text-xs uppercase text-white/45">{t.cursus.labels.outcome}</p>
                  <p className="mt-1 font-semibold text-white">{selectedCopy.outcome}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl transition-colors hover:bg-white/[0.1]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{t.cursus.labels.keyPoints}</p>
                  <p className="mt-1 text-sm text-white/45">{t.cursus.labels.keyPointsSub}</p>
                </div>
                <div className={`h-3 w-3 rounded-full ${selected.accent}`}></div>
              </div>
              <ul className="mt-6 space-y-4">
                {selectedCopy.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/72">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-morocco-200" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white p-5 text-morocco-950 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{t.cursus.labels.supervision}</p>
                  <p className="mt-1 text-sm text-sage-700">{t.cursus.labels.supervisionSub}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-morocco-100">
                  <UserCheck className="h-5 w-5 text-morocco-800" />
                </div>
              </div>
              <p className="mt-6 text-xl font-semibold">{selected.supervisor.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-sage-700">
                {selectedCopy.supervisorRole}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDetailsOpen((open) => !open)}
              className={`rounded-[24px] border border-white/10 p-5 text-left transition-all duration-300 ${
                detailsOpen
                  ? "bg-white text-morocco-950 sm:col-span-2 xl:col-span-1"
                  : "bg-white/[0.07] text-white hover:bg-white/[0.1]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{t.cursus.labels.details}</p>
                  <p className={`mt-1 text-sm ${detailsOpen ? "text-sage-700" : "text-white/45"}`}>
                    {t.cursus.labels.detailsSub}
                  </p>
                </div>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${detailsOpen ? "bg-morocco-100" : "bg-black/30"}`}>
                  {detailsOpen ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
                </span>
              </div>
              {detailsOpen && (
                <p className="mt-6 text-sm leading-relaxed text-sage-800">
                  {t.cursus.labels.detailsText}
                </p>
              )}
            </button>

            <a
              href={getWhatsAppLink(selectedCopy.message)}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[132px] flex-col justify-between rounded-[24px] bg-morocco-500 p-5 text-white shadow-2xl transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold">{t.cursus.labels.request}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-morocco-950 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/85">
                <MessageCircle className="h-4 w-4" />
                {t.cursus.labels.whatsapp}
              </div>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CursusSection;
