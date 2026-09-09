export const WHATSAPP_DISPLAY_NUMBER = "+33 6 64 95 32 38";
export const WHATSAPP_INTERNATIONAL_NUMBER = "33664953238";
export const PHONE_LINK = "+33664953238";

export const whatsappMessages = {
  information:
    "Salam, je souhaite avoir des informations sur les cours de l'Institut Souss Al-'Ālima.",
  inscription:
    "Salam, je souhaite m'inscrire aux cours de l'Institut Souss Al-'Ālima.",
};

export const getWhatsAppLink = (message = whatsappMessages.information) =>
  `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}?text=${encodeURIComponent(message)}`;
