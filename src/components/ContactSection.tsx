import { ArrowRight, CheckCircle2, MessageCircle, Phone, Send } from "lucide-react";
import {
  getWhatsAppLink,
  PHONE_LINK,
  WHATSAPP_DISPLAY_NUMBER,
} from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const ContactSection = () => {
  const { t } = useLanguage();
  const quickMessages = [
    {
      label: t.contact.quick[0],
      href: getWhatsAppLink(t.contact.messages.information),
    },
    {
      label: t.contact.quick[1],
      href: getWhatsAppLink(t.contact.messages.inscription),
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-morocco-950 py-16 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-morocco-950 via-morocco-950 to-[#10241f]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
              <img
                src="/lovable-uploads/souss-hero-4k.jpeg"
                alt={t.contact.imageAlt}
                className="h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-morocco-950 to-transparent"></div>
            </div>

            <div className="relative max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase text-morocco-200">
                {t.contact.badge}
              </p>
              <h2 className="text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
                {t.contact.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                {t.contact.body}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.contact.steps.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl"
                  >
                    <CheckCircle2 className="mb-4 h-5 w-5 text-morocco-200" />
                    <p className="text-sm font-semibold leading-snug text-white/85">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[30px] bg-white p-5 text-morocco-950 shadow-2xl sm:p-6">
            <div className="rounded-2xl bg-[#f8f5ef] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-morocco-950 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-sage-600">{t.contact.direct}</p>
                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="text-xl font-semibold text-morocco-950 hover:text-morocco-700 sm:text-2xl"
                  >
                    {WHATSAPP_DISPLAY_NUMBER}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {quickMessages.map((message) => (
                <a
                  key={message.label}
                  href={message.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-morocco-950 px-5 py-4 text-white transition-transform hover:scale-[1.02]"
                >
                  <span className="inline-flex items-center gap-3 font-semibold">
                    <Send className="h-5 w-5 text-morocco-200" />
                    {message.label} {t.contact.whatsappSuffix}
                  </span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <a
              href="#cursus"
              className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-morocco-200 px-5 py-4 font-semibold text-morocco-800 transition-colors hover:bg-morocco-50"
            >
              {t.contact.seeCursus}
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="mt-6 rounded-2xl border border-sage-200 p-5">
              <Phone className="mb-4 h-5 w-5 text-morocco-700" />
              <p className="text-sm font-semibold uppercase text-sage-500">{t.contact.advice}</p>
              <p className="mt-2 text-sm leading-relaxed text-sage-700">
                {t.contact.adviceText}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
