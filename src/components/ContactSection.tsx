import { ExternalLink, Instagram, MessageCircle, Phone } from "lucide-react";
import {
  FACEBOOK_URL,
  getWhatsAppLink,
  INSTAGRAM_URL,
  PHONE_LINK,
  WHATSAPP_DISPLAY_NUMBER,
} from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-[#f8f5ef] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase text-morocco-700">
          {t.contact.badge}
        </p>
        <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-tight text-morocco-950 sm:text-5xl">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sage-800 sm:text-lg">
          {t.contact.body}
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <a
            href={getWhatsAppLink(t.contact.messages.inscription)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-morocco-950 px-6 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-5 w-5" />
            {t.header.enrollWhatsapp}
          </a>

          <a
            href={`tel:${PHONE_LINK}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-morocco-800 hover:text-morocco-950"
          >
            <Phone className="h-4 w-4" />
            {WHATSAPP_DISPLAY_NUMBER}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 border-t border-morocco-200 pt-6 text-sm font-semibold text-sage-700">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-morocco-950"
          >
            <ExternalLink className="h-4 w-4" />
            Facebook
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-morocco-950"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
