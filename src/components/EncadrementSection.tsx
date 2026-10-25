import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const teachers = [
  "Sidi Mohammed Nît 'Abd Allah al-Tāfrawtī al-Sūsī",
  "Sidi Ibrāhīm Amrāḥ al-Baʿmranī",
  "Hussein Jbara",
];

const EncadrementSection = () => {
  const { t } = useLanguage();
  const teacherCopy = t.supervision.profiles[2];

  return (
    <section id="encadrement" className="bg-[#fbf8f2] py-20 text-morocco-950 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm tracking-[0.12em] text-morocco-700">{t.supervision.badge}</p>
            <h2 className="max-w-xl font-display text-4xl font-normal leading-tight sm:text-5xl">
              {t.supervision.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-sage-800 sm:text-lg">
              {t.supervision.body}
            </p>

            <details className="group mt-8 border-t border-morocco-200 pt-5">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-morocco-800">
                {t.supervision.transmission}
                <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <ol className="mt-6 space-y-5">
                {teachers.map((name, index) => (
                  <li key={name} className="border-l border-morocco-300 pl-4">
                    <p className="text-xs tracking-[0.1em] text-sage-600">{t.supervision.chain[index]}</p>
                    <p className="mt-1 font-display text-lg text-morocco-950">{name}</p>
                    <p className="mt-1 text-sm leading-6 text-sage-700">{t.supervision.profiles[index].label}</p>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          <article className="border-y border-morocco-200 bg-[#f2ece2] px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
            <p className="text-sm tracking-[0.1em] text-morocco-700">{teacherCopy.label}</p>
            <h3 className="mt-3 font-display text-3xl font-normal leading-tight sm:text-4xl">
              {teachers[2]}
            </h3>
            <p className="mt-2 text-sm text-sage-700">{teacherCopy.place}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-sage-800">{teacherCopy.note}</p>

            <dl className="mt-8 grid gap-6 border-t border-morocco-200 pt-6 sm:grid-cols-[0.72fr_1.28fr]">
              <div>
                <dt className="text-xs tracking-[0.1em] text-sage-600">{t.supervision.function}</dt>
                <dd className="mt-2 font-display text-xl text-morocco-950">{teacherCopy.role}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.1em] text-sage-600">{t.supervision.domains}</dt>
                <dd className="mt-2 text-sm leading-7 text-sage-800">{teacherCopy.domains.join(" · ")}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
};

export default EncadrementSection;
