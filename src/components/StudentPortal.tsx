import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, LockKeyhole, LogOut, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";

const GROUP_URL = "https://t.me/+qlHw45Sgmaq4MjI5";

type StudentProfile = {
  id: string;
  display_name: string;
  role: "student" | "admin";
  is_active: boolean;
};

type ScheduleSlot = {
  id: string;
  weekday: number;
  starts_at: string;
  occupant_name: string | null;
  student_id: string | null;
};

const COPY = {
  fr: {
    badge: "Espace élèves",
    heading: "Le planning des cours",
    intro: "Connectez-vous avec votre compte personnel pour consulter et réserver un créneau hebdomadaire.",
    setup: "L’espace élèves n’est pas encore configuré. Les coordonnées Supabase et la migration de la base de données sont nécessaires avant sa mise en service.",
    email: "Adresse e-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion…",
    invalidLogin: "Connexion impossible. Vérifiez votre e-mail et votre mot de passe.",
    inactive: "Ce compte n’a pas accès au planning. Contactez l’institut.",
    scheduleError: "Le planning n’a pas pu être chargé. Réessayez ou contactez l’institut.",
    profileError: "Le nom du compte n’a pas pu être enregistré.",
    name: "Nom affiché dans le planning",
    namePlaceholder: "Prénom et nom",
    saveName: "Enregistrer le nom",
    choose: "Sélectionnez une place verte pour réserver le même créneau chaque semaine.",
    week: "Planning hebdomadaire",
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    available: "Réserver",
    booked: "Réservé",
    reservedBy: "Réservé par",
    reserve: "Confirmer",
    cancel: "Annuler",
    selected: "Créneau choisi",
    full: "Ce créneau vient d’être réservé. Choisissez-en un autre.",
    bookError: "La réservation n’a pas pu être enregistrée. Réessayez.",
    cancelError: "La réservation n’a pas pu être annulée. Réessayez.",
    telegram: "Rejoindre le groupe Telegram",
    groupNotice: "Les cours ont lieu dans le groupe Telegram. Rejoignez-le puis ouvrez le salon vidéo à l’heure de votre cours.",
    leave: "Se déconnecter",
    back: "Retour au site de l’institut",
    timezone: "Les horaires sont enregistrés en heure du Maroc (🇲🇦). L’heure de France (🇫🇷) est calculée selon la date.",
    authError: "La vérification de votre compte a échoué. Réessayez.",
  },
  en: {
    badge: "Student area",
    heading: "Class schedule",
    intro: "Sign in with your personal account to view and book a weekly time slot.",
    setup: "The student area is not configured yet. Supabase credentials and the database migration are required before it can go live.",
    email: "Email address",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    invalidLogin: "Sign-in failed. Check your email and password.",
    inactive: "This account cannot access the schedule. Contact the institute.",
    scheduleError: "The schedule could not be loaded. Try again or contact the institute.",
    profileError: "The account name could not be saved.",
    name: "Name shown in the schedule",
    namePlaceholder: "First and last name",
    saveName: "Save name",
    choose: "Select a green place to book the same time every week.",
    week: "Weekly schedule",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    available: "Book",
    booked: "Booked",
    reservedBy: "Booked by",
    reserve: "Confirm",
    cancel: "Cancel",
    selected: "Selected time",
    full: "This time was just booked. Choose another one.",
    bookError: "The booking could not be saved. Try again.",
    cancelError: "The booking could not be cancelled. Try again.",
    telegram: "Join the Telegram group",
    groupNotice: "Classes take place in the Telegram group. Join it, then open the video chat at your class time.",
    leave: "Sign out",
    back: "Back to the institute website",
    timezone: "Times are stored in Morocco time (🇲🇦). France time (🇫🇷) is calculated for each date.",
    authError: "Your account could not be verified. Try again.",
  },
  es: {
    badge: "Área de alumnos",
    heading: "Horario de clases",
    intro: "Inicia sesión con tu cuenta personal para consultar y reservar un horario semanal.",
    setup: "El área de alumnos aún no está configurada. Se necesitan las credenciales de Supabase y la migración de la base de datos para activarla.",
    email: "Correo electrónico",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión…",
    invalidLogin: "No se pudo iniciar sesión. Comprueba tu correo y contraseña.",
    inactive: "Esta cuenta no tiene acceso al horario. Contacta con el instituto.",
    scheduleError: "No se pudo cargar el horario. Inténtalo de nuevo o contacta con el instituto.",
    profileError: "No se pudo guardar el nombre de la cuenta.",
    name: "Nombre en el horario",
    namePlaceholder: "Nombre y apellidos",
    saveName: "Guardar nombre",
    choose: "Elige una plaza verde para reservar el mismo horario cada semana.",
    week: "Horario semanal",
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    available: "Reservar",
    booked: "Reservado",
    reservedBy: "Reservado por",
    reserve: "Confirmar",
    cancel: "Cancelar",
    selected: "Horario elegido",
    full: "Este horario acaba de reservarse. Elige otro.",
    bookError: "No se pudo guardar la reserva. Inténtalo de nuevo.",
    cancelError: "No se pudo cancelar la reserva. Inténtalo de nuevo.",
    telegram: "Unirse al grupo de Telegram",
    groupNotice: "Las clases tienen lugar en el grupo de Telegram. Únete y abre la sala de vídeo a la hora de clase.",
    leave: "Cerrar sesión",
    back: "Volver al sitio del instituto",
    timezone: "Los horarios se guardan en hora de Marruecos (🇲🇦). La hora de Francia (🇫🇷) se calcula según la fecha.",
    authError: "No se pudo verificar tu cuenta. Inténtalo de nuevo.",
  },
} as const;

function mondayFor(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - day);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getTimeZoneInstant(date: Date, time: string, timeZone: string) {
  const [hour, minute] = time.split(":").map(Number);
  const targetUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
  let instant = targetUtc;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(instant)).map(({ type, value }) => [type, value]),
    );
    const localAsUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
    );
    instant += targetUtc - localAsUtc;
  }
  return new Date(instant);
}

function formatTime(time: string, date: Date, timeZone: string) {
  const instant = getTimeZoneInstant(date, time, "Africa/Casablanca");
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(instant).replace(":", "h");
}

function formatDisplayDate(date: Date, language: string) {
  return new Intl.DateTimeFormat(language, { day: "numeric", month: "short" }).format(date);
}

function formatTimeRange(start: string, date: Date, timeZone: string) {
  const [hour, minute] = start.split(":").map(Number);
  const endMinutes = hour * 60 + minute + 15;
  const end = `${String(Math.floor((endMinutes % 1440) / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + Math.floor(endMinutes / 1440));
  return `${formatTime(start, date, timeZone)}–${formatTime(end, endDate, timeZone)}`;
}

const StudentPortal = () => {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [status, setStatus] = useState<"loading" | "unconfigured" | "signedOut" | "authenticated">("loading");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const weekStart = useMemo(() => mondayFor(new Date()), []);
  const weekDays = useMemo(() => Array.from({ length: 5 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return date;
  }), [weekStart]);
  const selected = slots.find((slot) => slot.id === selectedSlot);
  const timeRows = useMemo(
    () => [...new Set(slots.map((slot) => slot.starts_at))].sort(),
    [slots],
  );

  const verifyUser = useCallback(async (currentUser: User) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("student_profiles")
      .select("id,display_name,role,is_active")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (error) {
      setNotice(copy.authError);
      setStatus("signedOut");
      setUser(null);
      setProfile(null);
      return;
    }

    if (!data || !data.is_active || data.role !== "student") {
      await supabase.auth.signOut();
      setNotice(copy.inactive);
      setStatus("signedOut");
      setUser(null);
      setProfile(null);
      return;
    }

    setUser(currentUser);
    setProfile(data);
    setNotice("");
    setStatus("authenticated");
  }, [copy.authError, copy.inactive]);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setStatus("unconfigured");
      return;
    }

    let active = true;
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error) {
        setNotice(copy.authError);
        setStatus("signedOut");
        return;
      }
      if (data.session?.user) {
        await verifyUser(data.session.user);
      } else {
        setStatus("signedOut");
      }
    };

    void restoreSession();
    return () => {
      active = false;
    };
  }, [copy.authError, copy.inactive, verifyUser]);

  useEffect(() => {
    if (status !== "authenticated" || !user || !supabase) return;
    let active = true;

    const fetchSlots = async () => {
      setScheduleLoading(true);
      const [scheduleResult, settingsResult] = await Promise.all([
        supabase
          .from("schedule_slots")
          .select("id,weekday,starts_at,occupant_name,student_id")
          .order("weekday", { ascending: true })
          .order("starts_at", { ascending: true }),
        supabase
          .from("student_portal_settings")
          .select("telegram_invite_url")
          .eq("id", true)
          .maybeSingle(),
      ]);

      if (!active) return;
      setScheduleLoading(false);
      if (scheduleResult.error || settingsResult.error || !settingsResult.data) {
        setNotice(copy.scheduleError);
        return;
      }
      setSlots(scheduleResult.data ?? []);
      setTelegramUrl(settingsResult.data.telegram_invite_url);
    };

    void fetchSlots();
    return () => {
      active = false;
    };
  }, [copy.scheduleError, status, user]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setNotice("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);

    if (error || !data.user) {
      setNotice(copy.invalidLogin);
      return;
    }
    setPassword("");
    await verifyUser(data.user);
  };

  const signOut = async () => {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    if (error) {
      setNotice(copy.authError);
      return;
    }
    setUser(null);
    setProfile(null);
    setSlots([]);
    setTelegramUrl(null);
    setSelectedSlot(null);
    setNotice("");
    setStatus("signedOut");
  };

  const saveDisplayName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !user || !profile) return;
    const displayName = profile.display_name.trim();
    if (displayName.length < 2 || displayName.length > 80) {
      setNotice(copy.profileError);
      return;
    }

    setBusy(true);
    setNotice("");
    const { data, error } = await supabase
      .from("student_profiles")
      .update({ display_name: displayName })
      .eq("id", user.id)
      .select("id,display_name,role,is_active")
      .single();
    setBusy(false);
    if (error || !data) {
      setNotice(copy.profileError);
      return;
    }

    setProfile(data);
    setSlots((current) => current.map((slot) =>
      slot.student_id === user.id ? { ...slot, occupant_name: data.display_name } : slot,
    ));
  };

  const refreshSchedule = async () => {
    if (!supabase) return false;
    const { data, error } = await supabase
      .from("schedule_slots")
      .select("id,weekday,starts_at,occupant_name,student_id")
      .order("weekday", { ascending: true })
      .order("starts_at", { ascending: true });
    if (error) {
      setNotice(copy.scheduleError);
      return false;
    }
    setSlots(data ?? []);
    return true;
  };

  const reserveSlot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !selectedSlot) return;
    setBusy(true);
    setNotice("");
    const { data, error } = await supabase.rpc("book_schedule_slot", { p_slot_id: selectedSlot });
    setBusy(false);
    setSelectedSlot(null);

    if (error) {
      setNotice(copy.bookError);
      await refreshSchedule();
      return;
    }
    if (!data) {
      setNotice(copy.full);
    }
    await refreshSchedule();
  };

  const cancelSlot = async (slotId: string) => {
    if (!supabase) return;
    setBusy(true);
    setNotice("");
    const { data, error } = await supabase.rpc("cancel_schedule_slot", { p_slot_id: slotId });
    setBusy(false);
    if (error || !data) {
      setNotice(copy.cancelError);
    }
    await refreshSchedule();
  };

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

        {status === "loading" && (
          <p role="status" className="mx-auto mt-10 max-w-md border-y border-morocco-200 bg-[#fbf8f2] p-6 text-center text-sm text-sage-700">
            {copy.signingIn}
          </p>
        )}

        {status === "unconfigured" && (
          <p role="alert" className="mx-auto mt-10 max-w-2xl border-l-2 border-morocco-500 bg-[#fbf8f2] p-5 text-sm leading-7 text-sage-800">
            {copy.setup}
          </p>
        )}

        {status === "signedOut" && (
          <form onSubmit={signIn} className="mx-auto mt-10 max-w-md border-y border-morocco-200 bg-[#fbf8f2] p-6 sm:p-8">
            <label htmlFor="student-email" className="block text-sm text-morocco-950">
              {copy.email}
              <input
                id="student-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border border-morocco-200 bg-white px-4 py-3 text-sm text-morocco-950 outline-none focus:border-morocco-600"
              />
            </label>
            <label htmlFor="student-password" className="mt-4 block text-sm text-morocco-950">
              {copy.password}
              <input
                id="student-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border border-morocco-200 bg-white px-4 py-3 text-sm text-morocco-950 outline-none focus:border-morocco-600"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-morocco-700 px-5 text-sm text-white hover:bg-morocco-800 disabled:cursor-wait disabled:opacity-60"
            >
              <LockKeyhole className="h-4 w-4" />
              {busy ? copy.signingIn : copy.signIn}
            </button>
          </form>
        )}

        {status === "authenticated" && profile && (
          <>
            <div className="mt-10 border-y border-morocco-200 bg-[#fbf8f2] p-4 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-morocco-200 pb-5">
                <div>
                  <p className="text-sm text-morocco-800">
                      {copy.week}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-sage-600">{copy.timezone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    disabled={busy}
                    className="ml-2 inline-flex h-10 items-center gap-2 border border-morocco-200 px-3 text-sm text-morocco-800 hover:bg-morocco-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">{copy.leave}</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <form onSubmit={saveDisplayName} className="flex w-full max-w-xl flex-wrap items-end gap-2">
                  <label htmlFor="student-name" className="min-w-[220px] flex-1">
                    <span className="block text-sm text-morocco-950">{copy.name}</span>
                    <input
                      id="student-name"
                      type="text"
                      minLength={2}
                      maxLength={80}
                      required
                      value={profile.display_name}
                      onChange={(event) => setProfile({ ...profile, display_name: event.target.value })}
                      className="mt-2 w-full border border-morocco-200 bg-white px-4 py-2.5 text-sm text-morocco-950 outline-none focus:border-morocco-600"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={busy}
                    className="min-h-[42px] bg-morocco-700 px-4 text-sm text-white hover:bg-morocco-800 disabled:opacity-60"
                  >
                    {copy.saveName}
                  </button>
                </form>
                <p className="text-sm text-sage-700">{copy.choose}</p>
              </div>

              {notice && <p role="alert" className="mt-3 text-sm text-red-800">{notice}</p>}
              {selected && (
                <form onSubmit={reserveSlot} className="mt-4 flex flex-wrap items-center gap-3 border border-morocco-200 bg-morocco-50 p-3">
                  <p className="mr-auto text-sm text-morocco-900">
                    {copy.selected}: {copy.days[selected.weekday - 1]} · {formatTimeRange(selected.starts_at, weekDays[selected.weekday - 1], "Africa/Casablanca")} 🇲🇦 · {formatTimeRange(selected.starts_at, weekDays[selected.weekday - 1], "Europe/Paris")} 🇫🇷
                  </p>
                  <button type="button" onClick={() => setSelectedSlot(null)} className="px-3 py-2 text-sm text-sage-700 hover:text-morocco-950">
                    {copy.cancel}
                  </button>
                  <button type="submit" disabled={busy} className="bg-morocco-700 px-4 py-2 text-sm text-white hover:bg-morocco-800 disabled:opacity-60">
                    {copy.reserve}
                  </button>
                </form>
              )}

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[760px] table-fixed border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="w-44 border border-morocco-300 bg-[#784638] px-3 py-3 text-left text-xs font-medium text-white">
                        <CalendarDays className="mb-1 h-4 w-4" />
                        {copy.week}
                      </th>
                      {weekDays.map((date, index) => (
                        <th key={date.toISOString()} className="border border-morocco-300 bg-[#f2ece2] px-2 py-3 text-sm font-semibold text-morocco-950">
                          {copy.days[index]}<br />
                          <span className="mt-1 block text-xs font-normal text-sage-700">{formatDisplayDate(date, language)}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.length === 0 && !scheduleLoading ? (
                      <tr><td colSpan={6} className="border border-morocco-300 bg-white p-6 text-sm text-sage-700">{copy.scheduleError}</td></tr>
                    ) : timeRows.map((start) => (
                      <tr key={start}>
                        <th scope="row" className="border border-morocco-300 bg-[#784638] px-3 py-2 text-left text-xs font-medium leading-5 text-white">
                          {formatTimeRange(start, weekDays[0], "Africa/Casablanca")} 🇲🇦<br />
                          <span className="text-white/75">{formatTimeRange(start, weekDays[0], "Europe/Paris")} 🇫🇷</span>
                        </th>
                        {weekDays.map((day, index) => {
                          const slot = slots.find((item) => item.weekday === index + 1 && item.starts_at === start);
                          const occupied = Boolean(slot?.occupant_name);
                          const isMine = slot?.student_id === user?.id;
                          return (
                            <td key={day.toISOString()} className={`h-14 border border-morocco-300 p-1 ${occupied ? "bg-white" : "bg-[#d8e8d2]"}`}>
                              {!slot ? (
                                <span className="sr-only">{copy.scheduleError}</span>
                              ) : occupied ? (
                                <button
                                  type="button"
                                  onClick={() => isMine && void cancelSlot(slot.id)}
                                  disabled={!isMine || busy}
                                  title={isMine ? copy.cancel : `${copy.reservedBy}: ${slot.occupant_name}`}
                                  className={`h-full w-full px-2 text-sm font-semibold ${isMine ? "text-morocco-800 underline decoration-morocco-300 underline-offset-4" : "cursor-default text-morocco-950"}`}
                                >
                                  {slot.occupant_name}
                                  {isMine && <span className="sr-only"> — {copy.cancel}</span>}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setSelectedSlot(selectedSlot === slot.id ? null : slot.id)}
                                  aria-pressed={selectedSlot === slot.id}
                                  disabled={busy || scheduleLoading}
                                  className={`h-full w-full px-2 text-xs transition-colors ${selectedSlot === slot.id ? "bg-morocco-100 text-morocco-950" : "text-sage-700 hover:bg-[#c8ddc1] hover:text-morocco-950"}`}
                                >
                                  {copy.available}
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-sage-700">
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[#d8e8d2]" />{copy.available}</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 border border-morocco-200 bg-white" />{copy.booked}</span>
              </div>
            </div>

            {telegramUrl && (
              <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-4 border-y border-morocco-200 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-sage-700">{copy.groupNotice}</p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-morocco-700 px-5 py-3 text-sm text-white hover:bg-morocco-800"
              >
                <Users className="h-4 w-4" />
                {copy.telegram}
                <MessageCircle className="h-4 w-4" />
              </a>
              </div>
            )}
          </>
        )}

        {!notice.startsWith(copy.authError) && notice && status === "signedOut" && (
          <p role="alert" className="mx-auto mt-4 max-w-md text-center text-sm text-red-800">{notice}</p>
        )}

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <Link to="/" className="text-sm text-morocco-800 underline decoration-morocco-300 underline-offset-4 hover:decoration-morocco-700">
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            {copy.back}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudentPortal;
