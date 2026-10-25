import { videoAssets } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n";

const MethodologySection = () => {
  const { t } = useLanguage();

  return (
    <section id="methode" className="bg-[#eee7dc] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
            {t.methodology.badge}
          </p>
          <h2 className="max-w-2xl text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl">
            {t.methodology.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sage-800 sm:text-lg">
            {t.methodology.body}
          </p>

          <div className="mt-10 overflow-hidden border border-morocco-200 bg-morocco-950 text-white">
            <video
              className="h-72 w-full object-cover sm:h-[420px]"
              src={videoAssets.tradition}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t.methodology.imageAlt}
            />
            <p className="border-t border-white/10 px-5 py-4 text-sm text-white/65">
              {t.methodology.imageText}
            </p>
          </div>
        </div>

        <ol className="self-center border-l border-morocco-300 pl-6 sm:pl-8">
          {t.methodology.steps.map((step, index) => (
            <li key={step[0]} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[34px] flex h-5 w-5 items-center justify-center border border-morocco-300 bg-[#eee7dc] text-[10px] text-morocco-800 sm:-left-[42px]">
                {index + 1}
              </span>
              <p className="text-sm font-semibold uppercase text-sage-500">
                {t.methodology.step} {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-morocco-950">
                {step[0]}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-sage-700">
                {step[1]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default MethodologySection;
