import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const PORTAL_URL = import.meta.env.VITE_STUDENT_PORTAL_URL;

const COPY = {
  fr: {
    badge: "Espace élèves",
    heading: "Le planning des cours",
    intro: "Entrez le mot de passe de l’espace élèves pour consulter le planning, réserver un créneau et rejoindre le groupe de cours.",
    setup: "L’espace élèves sera disponible lorsque le planning Google Sheets aura été configuré et relié au site.",
    frameTitle: "Planning sécurisé des élèves",
  },
  en: {
    badge: "Student area",
    heading: "Class schedule",
    intro: "Enter the student area password to view the schedule, book a time slot and join the class group.",
    setup: "The student area will be available once the Google Sheets schedule has been configured and connected to the website.",
    frameTitle: "Secure student schedule",
  },
  es: {
    badge: "Área de alumnos",
    heading: "Horario de clases",
    intro: "Introduce la contraseña del área de alumnos para consultar el horario, reservar una plaza y unirte al grupo de clase.",
    setup: "El área de alumnos estará disponible cuando se configure el horario de Google Sheets y se conecte al sitio web.",
    frameTitle: "Horario seguro de alumnos",
  },
} as const;

const StudentPortal = () => {
  const { language } = useLanguage();
  const copy = COPY[language];
  const iframe = useRef<HTMLIFrameElement>(null);
  const [portalHeight, setPortalHeight] = useState(1250);

  useEffect(() => {
    const resizePortal = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow || event.data?.type !== "student-portal-height") return;
      const height = Number(event.data.height);
      if (Number.isFinite(height)) setPortalHeight(Math.min(3500, Math.max(850, height)));
    };

    window.addEventListener("message", resizePortal);
    return () => window.removeEventListener("message", resizePortal);
  }, []);

  return (
    <section id="espace-eleves" className="bg-[#eee7dc] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm tracking-[0.12em] text-morocco-700">{copy.badge}</p>
          <h1 className="font-display text-4xl font-normal leading-tight text-morocco-950 sm:text-5xl">
            {copy.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-sage-800 sm:text-lg">
            {copy.intro}
          </p>
        </div>

        {PORTAL_URL ? (
          <iframe
            ref={iframe}
            title={copy.frameTitle}
            src={PORTAL_URL}
            className="mx-auto mt-10 block w-full max-w-6xl border-0 bg-[#fbf8f2]"
            style={{ height: portalHeight }}
            loading="eager"
            referrerPolicy="strict-origin"
          />
        ) : (
          <p role="status" className="mx-auto mt-10 max-w-2xl border-l-2 border-morocco-500 bg-[#fbf8f2] p-5 text-sm leading-7 text-sage-800">
            {copy.setup}
          </p>
        )}
      </div>
    </section>
  );
};

export default StudentPortal;
