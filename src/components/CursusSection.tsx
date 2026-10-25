import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const cursus = [
  {
    arabic: "القرآن الكريم",
    accent: "border-morocco-600",
    supervisor: "Hussein Jbara",
  },
  {
    arabic: "علم التجويد",
    accent: "border-sage-600",
    supervisor: "Pr. Ahmed Benmhan",
  },
  {
    arabic: "النحو العربي",
    accent: "border-morocco-400",
    supervisor: "Cheikh Sâlih Al-Manqouch As-Soussi",
  },
];

const CursusSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useLanguage();
  const selected = cursus[selectedIndex];
  const selectedCopy = t.cursus.items[selectedIndex];

  return (
    <section id="cursus" className="bg-[#fbf8f2] py-20 text-morocco-950 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-b border-morocco-200 pb-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm tracking-[0.12em] text-morocco-700">{t.cursus.badge}</p>
            <h2 className="max-w-2xl font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {t.cursus.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-sage-800 sm:text-lg lg:ml-auto">
            {t.cursus.body}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-b border-morocco-200" role="tablist" aria-label={t.cursus.labels.availableTitle}>
          {cursus.map((item, index) => {
            const copy = t.cursus.items[index];
            const isSelected = selectedIndex === index;

            return (
              <button
                key={copy.title}
                id={`cursus-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="cursus-panel"
                onClick={() => setSelectedIndex(index)}
                className={`relative min-h-16 border-b-2 px-1 pb-3 pt-2 text-left transition-colors ${
                  isSelected
                    ? `${item.accent} text-morocco-950`
                    : "border-transparent text-sage-600 hover:text-morocco-800"
                }`}
              >
                <span className="block font-display text-xl sm:text-2xl">{copy.title}</span>
                <span className="mt-1 block font-amiri text-lg text-morocco-700">{item.arabic}</span>
              </button>
            );
          })}
        </div>

        <div
          id="cursus-panel"
          role="tabpanel"
          aria-labelledby={`cursus-tab-${selectedIndex}`}
          className="grid gap-10 pt-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
        >
          <aside className="border-l-2 border-morocco-300 pl-6 lg:pl-8">
            <p className="font-amiri text-5xl leading-tight text-morocco-700 sm:text-6xl">{selected.arabic}</p>
            <h3 className="mt-5 font-display text-3xl font-normal leading-tight sm:text-4xl">
              {selectedCopy.title}
            </h3>
            <p className="mt-3 text-lg leading-7 text-morocco-800">{selectedCopy.subtitle}</p>
            <p className="mt-5 text-base leading-8 text-sage-800">{selectedCopy.description}</p>
            <a
              href={getWhatsAppLink(selectedCopy.message)}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center gap-2 bg-morocco-700 px-5 py-3 text-sm text-white transition-colors hover:bg-morocco-800"
            >
              <MessageCircle className="h-4 w-4" />
              {t.cursus.labels.request}
              <ArrowRight className="h-4 w-4" />
            </a>
          </aside>

          <div>
            <dl className="grid gap-x-8 gap-y-5 border-y border-morocco-200 py-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs tracking-[0.1em] text-sage-600">{t.cursus.labels.rhythm}</dt>
                <dd className="mt-2 text-sm leading-6 text-morocco-950">{selectedCopy.rhythm}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.1em] text-sage-600">{t.cursus.labels.level}</dt>
                <dd className="mt-2 text-sm leading-6 text-morocco-950">{selectedCopy.level}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.1em] text-sage-600">{t.cursus.labels.outcome}</dt>
                <dd className="mt-2 text-sm leading-6 text-morocco-950">{selectedCopy.outcome}</dd>
              </div>
            </dl>

            <p className="mt-7 text-sm tracking-[0.1em] text-morocco-700">{t.cursus.labels.keyPoints}</p>
            <ul className="mt-4 space-y-4">
              {selectedCopy.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-sage-800 sm:text-base">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-morocco-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-morocco-200 pt-5">
              <p className="text-xs tracking-[0.1em] text-sage-600">{t.cursus.labels.supervision}</p>
              <p className="mt-2 font-display text-xl text-morocco-950">{selected.supervisor}</p>
              <p className="mt-1 text-sm leading-6 text-sage-700">{selectedCopy.supervisorRole}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CursusSection;
