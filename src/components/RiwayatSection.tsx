import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { assetPath, videoAssets } from "@/lib/assets";
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
    <section id="riwayat" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
        src={videoAssets.tradition}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath("/lovable-uploads/f0440189-3dc2-43a1-bb41-ebd48c38f96c-4k.jpeg")}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/92"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
              {t.riwayat.badge}
            </p>
            <h2 className="max-w-2xl text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl">
              {t.riwayat.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-sage-800 sm:text-lg lg:ml-auto">
            {t.riwayat.body}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {riwayat.map((riwaya, index) => (
              <button
                key={riwaya.name}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`min-w-[230px] rounded-lg border px-4 py-4 text-left transition-colors lg:w-full ${
                  selectedIndex === index
                    ? "border-morocco-950 bg-morocco-950 text-white"
                    : "border-morocco-200 bg-white/75 text-morocco-950 hover:border-morocco-400"
                }`}
              >
                <p className="font-amiri text-2xl">{riwaya.arabicName}</p>
                <p className="mt-1 text-sm font-semibold">{riwaya.name}</p>
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-[#f8f5ef] p-6 text-morocco-950 shadow-sm sm:p-8 lg:p-12">
            <div className="max-w-3xl">
              <p className="font-amiri text-5xl leading-none text-morocco-800 sm:text-7xl">
                {selected.arabicName}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-medium leading-tight sm:text-4xl">
                  {selected.name}
                </h3>
                {selected.highlight && (
                  <span className="rounded-full bg-morocco-100 px-3 py-1 text-xs font-semibold uppercase text-morocco-800">
                    {t.riwayat.specialty}
                  </span>
                )}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-sage-800">
                {selectedCopy.description}
              </p>
            </div>

            <dl className="mt-8 grid gap-6 border-y border-morocco-200 py-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase text-sage-500">{t.riwayat.origin}</dt>
                <dd className="mt-2 font-semibold text-morocco-950">{selectedCopy.origin}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-sage-500">{t.riwayat.workedPoints}</dt>
                <dd className="mt-2 text-sage-800">{selectedCopy.features.join(" · ")}</dd>
              </div>
            </dl>

            <details className="group mt-6">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-morocco-800">
                {t.riwayat.forWhom}
                <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-sage-700 sm:grid-cols-2">
                {t.riwayat.audience.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-morocco-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiwayatSection;
