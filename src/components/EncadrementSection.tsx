import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n";

const profiles = [
  {
    name: "Sidi Mohammed Nît 'Abd Allah al-Tāfrawtī al-Sūsī",
    image: assetPath("/lovable-uploads/3a077fe5-1c67-4d03-b9cd-3c07ecc5027d-4k.jpeg"),
  },
  {
    name: "Sidi Ibrāhīm Amrāḥ al-Baʿmranī",
    image: assetPath("/lovable-uploads/ce4a0e7d-bad0-44df-820d-e868f0f9b7ae-4k.jpeg"),
  },
  {
    name: "Hussein Jbara",
    image: assetPath("/lovable-uploads/52f4854d-35b0-4f5f-a86a-0c41daedb49d-4k.jpeg"),
  },
];

const EncadrementSection = () => {
  const { t } = useLanguage();
  const teacher = profiles[2];
  const teacherCopy = t.supervision.profiles[2];

  return (
    <section id="encadrement" className="bg-morocco-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-morocco-200">
              {t.supervision.badge}
            </p>
            <h2 className="max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">
              {t.supervision.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {t.supervision.body}
            </p>

            <details className="group mt-8 border-t border-white/10 pt-6">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-morocco-100">
                {t.supervision.transmission}
                <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-5 space-y-5">
                {profiles.map((profile, index) => (
                  <div key={profile.name} className="grid gap-1 border-l border-white/15 pl-4">
                    <p className="text-xs font-semibold uppercase text-white/35">
                      {t.supervision.chain[index]}
                    </p>
                    <p className="font-semibold text-white">{profile.name}</p>
                    <p className="text-sm text-white/55">{t.supervision.profiles[index].label}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="overflow-hidden rounded-lg bg-white text-morocco-950 shadow-xl">
            <div className="relative min-h-[380px] sm:min-h-[520px]">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-morocco-950/72 via-morocco-950/15 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <p className="text-sm font-semibold uppercase text-morocco-100">
                  {teacherCopy.label}
                </p>
                <h3 className="mt-2 text-3xl font-medium leading-tight sm:text-4xl">
                  {teacher.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-xs font-semibold uppercase text-sage-500">
                    {t.supervision.function}
                  </p>
                  <p className="mt-2 font-semibold text-morocco-950">{teacherCopy.role}</p>
                  <p className="mt-1 text-sm text-sage-600">{teacherCopy.place}</p>
                </div>
                <p className="text-base leading-relaxed text-sage-800">
                  {teacherCopy.note}
                </p>
              </div>
              <p className="mt-6 border-t border-morocco-200 pt-5 text-sm leading-relaxed text-sage-700">
                {teacherCopy.domains.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncadrementSection;
