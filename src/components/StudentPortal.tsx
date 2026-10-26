import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const PORTAL_URL = import.meta.env.VITE_STUDENT_PORTAL_URL;

const COPY = {
  fr: {
    badge: "Espace élèves",
    heading: "Le planning des cours",
    intro: "Entrez le mot de passe de l’espace élèves pour consulter le planning, réserver un créneau et rejoindre le groupe de cours.",
    setup: "L’espace élèves sera disponible lorsque le planning Google Sheets aura été configuré et relié au site.",
    frameTitle: "Planning sécurisé des élèves",
    loading: "Ouverture de l’espace élèves…",
    slow: "Le planning met du temps à s’ouvrir. Vous pouvez aussi l’ouvrir dans un nouvel onglet.",
    open: "Ouvrir le planning",
    retry: "Réessayer",
  },
  en: {
    badge: "Student area",
    heading: "Class schedule",
    intro: "Enter the student area password to view the schedule, book a time slot and join the class group.",
    setup: "The student area will be available once the Google Sheets schedule has been configured and connected to the website.",
    frameTitle: "Secure student schedule",
    loading: "Opening the student area…",
    slow: "The schedule is taking a while to open. You can also open it in a new tab.",
    open: "Open the schedule",
    retry: "Try again",
  },
  es: {
    badge: "Área de alumnos",
    heading: "Horario de clases",
    intro: "Introduce la contraseña del área de alumnos para consultar el horario, reservar una plaza y unirte al grupo de clase.",
    setup: "El área de alumnos estará disponible cuando se configure el horario de Google Sheets y se conecte al sitio web.",
    frameTitle: "Horario seguro de alumnos",
    loading: "Abriendo el área de alumnos…",
    slow: "El horario tarda en abrirse. También puedes abrirlo en una pestaña nueva.",
    open: "Abrir el horario",
    retry: "Reintentar",
  },
} as const;

const StudentPortal = () => {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [embedId] = useState(() => crypto.randomUUID());
  const [portalHeight, setPortalHeight] = useState(300);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const portalSrc = useMemo(() => {
    if (!PORTAL_URL) return "";
    const url = new URL(PORTAL_URL);
    url.searchParams.set("parentOrigin", window.location.origin);
    url.searchParams.set("embedId", `${embedId}-${attempt}`);
    url.searchParams.set("attempt", String(attempt));
    return url.toString();
  }, [embedId, attempt]);

  useEffect(() => {
    setReady(false);
    setSlow(false);
    setPortalHeight(300);
    const timer = window.setTimeout(() => setSlow(true), 15000);
    const resizePortal = (event: MessageEvent) => {
      if (event.data?.type !== "student-portal-height" || event.data.channel !== `${embedId}-${attempt}`) return;
      let origin: URL;
      try { origin = new URL(event.origin); } catch { return; }
      if (origin.protocol !== "https:" || !(origin.hostname === "script.google.com" || origin.hostname.endsWith("-script.googleusercontent.com"))) return;
      const height = Number(event.data.height);
      if (!Number.isFinite(height) || height <= 0) return;
      setPortalHeight(Math.min(6000, Math.max(240, height)));
      setReady(true);
      window.clearTimeout(timer);
    };

    window.addEventListener("message", resizePortal);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("message", resizePortal);
    };
  }, [embedId, attempt]);

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
          <div className="relative mx-auto mt-10 max-w-6xl" style={{ minHeight: ready ? undefined : 300 }}>
            {!ready && (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-5 px-5 text-center text-sage-800" role="status">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-morocco-200 border-t-morocco-700 motion-reduce:animate-none" aria-hidden="true" />
                <p className="max-w-md text-sm leading-7">{slow ? copy.slow : copy.loading}</p>
                {slow && <div className="flex flex-wrap justify-center gap-5 text-sm text-morocco-800">
                  <button type="button" onClick={() => setAttempt((value) => value + 1)} className="underline underline-offset-4">{copy.retry}</button>
                  <a href={PORTAL_URL} target="_blank" rel="noreferrer" className="underline underline-offset-4">{copy.open}</a>
                </div>}
              </div>
            )}
            <iframe
              title={copy.frameTitle}
              src={portalSrc}
              className={`block w-full border-0 ${ready ? "" : "pointer-events-none absolute inset-0 opacity-0"}`}
              style={{ height: portalHeight }}
              loading="eager"
              referrerPolicy="strict-origin"
              aria-hidden={!ready}
              tabIndex={ready ? 0 : -1}
            />
          </div>
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
