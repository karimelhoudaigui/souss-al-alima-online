import { assetPath, videoAssets } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n";

const MethodologySection = () => {
  const { t } = useLanguage();

  return (
    <section id="methode" className="relative overflow-hidden bg-[#f8f5ef] py-20 sm:py-28">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
        src={videoAssets.tradition}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath("/lovable-uploads/souss-hero-4k.jpeg")}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#f8f5ef]/90"></div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
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

          <div className="mt-10 overflow-hidden rounded-lg bg-morocco-950 text-white shadow-xl">
            <video
              className="pointer-events-none h-72 w-full object-cover opacity-90 sm:h-[420px]"
              src={videoAssets.tradition}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={assetPath("/lovable-uploads/a58cd622-7e2a-4c59-a2e9-966de0fd84dd-4k.jpeg")}
              aria-label={t.methodology.imageAlt}
            />
            <p className="border-t border-white/10 px-5 py-4 text-sm text-white/65">
              {t.methodology.imageText}
            </p>
          </div>
        </div>

        <ol className="self-center border-l border-morocco-200 pl-6 sm:pl-8">
          {t.methodology.steps.map((step, index) => (
            <li key={step[0]} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[34px] flex h-5 w-5 items-center justify-center rounded-full border border-morocco-300 bg-[#f8f5ef] text-[10px] font-semibold text-morocco-800 sm:-left-[42px]">
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
