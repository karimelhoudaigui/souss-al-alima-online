import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPinned, Route, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const riwayat = [
  {
    name: "Ḥafṣ ʿan ʿĀṣim",
    arabicName: "حفص عن عاصم",
  },
  {
    name: "Qālūn ʿan Nāfiʿ",
    arabicName: "قالون عن نافع",
  },
  {
    name: "Warsh ʿan Nāfiʿ",
    arabicName: "ورش عن نافع",
    highlight: true,
  },
];

const RiwayatSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const { t } = useLanguage();
  const selected = riwayat[selectedIndex];
  const selectedCopy = t.riwayat.items[selectedIndex];

  return (
    <section id="riwayat" className="relative overflow-hidden bg-[#f8f5ef] py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-morocco-200 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
              {t.riwayat.badge}
            </p>
            <h2 className="text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl lg:text-6xl">
              {t.riwayat.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-sage-800 sm:text-lg lg:ml-auto">
            {t.riwayat.body}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-3">
            {riwayat.map((riwaya, index) => (
              <button
                key={riwaya.name}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  selectedIndex === index
                    ? "border-morocco-400 bg-morocco-950 text-white shadow-xl"
                    : "border-morocco-200 bg-white text-morocco-950 hover:border-morocco-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-amiri text-2xl">{riwaya.arabicName}</p>
                    <p className="mt-1 font-semibold">{riwaya.name}</p>
                  </div>
                  <ArrowRight
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      selectedIndex === index ? "translate-x-1 text-morocco-200" : "text-sage-300"
                    }`}
                  />
                </div>
              </button>
            ))}

            <div className="rounded-2xl border border-sage-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase text-sage-500">{t.riwayat.forWhom}</p>
              <div className="mt-4 grid gap-3">
                {t.riwayat.audience.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-relaxed text-sage-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-morocco-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[30px] bg-morocco-950 p-5 text-white shadow-2xl sm:p-8">
            <div
              className="absolute inset-[-25%] opacity-25 animate-spin-bg"
              style={{
                background:
                  "conic-gradient(from 120deg, rgba(194,97,12,0.75), rgba(20,83,45,0.55), rgba(15,118,110,0.45), rgba(194,97,12,0.75))",
              }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]"></div>

            <div className="relative flex min-h-[500px] flex-col justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {selected.highlight && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-morocco-950">
                    <Sparkles className="h-4 w-4" />
                    {t.riwayat.specialty}
                  </span>
                )}
                <span className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/70">
                  {selectedCopy.status}
                </span>
              </div>

              <div className="my-16">
                <p className="font-amiri text-7xl leading-none text-morocco-100 sm:text-8xl lg:text-9xl">
                  {selected.arabicName}
                </p>
                <h3 className="mt-6 text-4xl font-medium leading-tight sm:text-5xl">
                  {selected.name}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                  {selectedCopy.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                  <MapPinned className="mb-5 h-5 w-5 text-morocco-200" />
                  <p className="text-xs uppercase text-white/45">{t.riwayat.origin}</p>
                  <p className="mt-1 font-semibold">{selectedCopy.origin}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl md:col-span-2">
                  <Route className="mb-5 h-5 w-5 text-sage-200" />
                  <p className="text-xs uppercase text-white/45">{t.riwayat.workedPoints}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCopy.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiwayatSection;
