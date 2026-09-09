import { useState } from "react";
import { ArrowRight, BookOpen, GraduationCap, MapPin, ShieldCheck, Users } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState(2);
  const { t } = useLanguage();
  const selected = profiles[selectedIndex];
  const selectedCopy = t.supervision.profiles[selectedIndex];

  return (
    <section id="encadrement" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-morocco-950"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 pb-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
              {t.supervision.badge}
            </p>
            <h2 className="text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl lg:text-6xl">
              {t.supervision.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-sage-800 sm:text-lg lg:ml-auto">
            {t.supervision.body}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <div className="rounded-[28px] border border-sage-200 bg-[#f8f5ef] p-4 shadow-xl sm:p-5">
            <div className="mb-5 flex items-center gap-3 px-1">
              <Users className="h-5 w-5 text-morocco-700" />
              <p className="text-sm font-semibold uppercase text-sage-600">{t.supervision.transmission}</p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              {t.supervision.chain.map((item, index) => (
                <div key={item} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                  <p className="text-xs uppercase text-sage-500">{t.supervision.level} {index + 1}</p>
                  <p className="mt-1 text-sm font-semibold text-morocco-950">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {profiles.map((profile, index) => (
                <button
                  key={profile.name}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`grid w-full grid-cols-[58px_1fr_auto] items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                    selectedIndex === index
                      ? "border-morocco-400 bg-morocco-950 text-white shadow-xl"
                      : "border-transparent bg-white text-morocco-950 hover:border-morocco-200"
                  }`}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{profile.name}</p>
                    <p
                      className={`mt-1 text-xs ${
                        selectedIndex === index ? "text-white/55" : "text-sage-600"
                      }`}
                    >
                      {t.supervision.profiles[index].label}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 ${
                      selectedIndex === index ? "text-morocco-200" : "text-sage-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[30px] bg-morocco-950 text-white shadow-2xl">
            <img
              src={selected.image}
              alt={selected.name}
              className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-morocco-950 via-morocco-950/82 to-morocco-950/38"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-morocco-950 via-transparent to-transparent"></div>

            <div className="relative flex min-h-[620px] flex-col justify-between p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-morocco-950">
                  <ShieldCheck className="h-4 w-4" />
                  {selectedCopy.role}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4" />
                  {selectedCopy.place}
                </span>
              </div>

              <div className="my-14 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase text-morocco-200">
                  {selectedCopy.label}
                </p>
                <h3 className="text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
                  {selected.name}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/68">
                  {selectedCopy.note}
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                  <GraduationCap className="mb-5 h-6 w-6 text-morocco-200" />
                  <p className="text-xs uppercase text-white/45">{t.supervision.function}</p>
                  <p className="mt-2 text-xl font-semibold">{selectedCopy.role}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                  <BookOpen className="mb-5 h-6 w-6 text-sage-200" />
                  <p className="text-xs uppercase text-white/45">{t.supervision.domains}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCopy.domains.map((domain) => (
                      <span
                        key={domain}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70"
                      >
                        {domain}
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

export default EncadrementSection;
