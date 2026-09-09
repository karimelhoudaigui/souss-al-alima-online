export const WHATSAPP_DISPLAY_NUMBER = "+33 6 64 95 32 38";
export const WHATSAPP_INTERNATIONAL_NUMBER = "33664953238";
export const PHONE_LINK = "+33664953238";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61556073107047";
export const INSTAGRAM_URL = "https://www.instagram.com/souss_al.alima";

export const whatsappMessages = {
  information:
    "Salam, je souhaite avoir des informations sur les cours de l'Institut Souss Al-'Ālima.",
  inscription:
    "Salam, je souhaite m'inscrire aux cours de l'Institut Souss Al-'Ālima.",
};

export const getWhatsAppLink = (message = whatsappMessages.information) =>
  `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}?text=${encodeURIComponent(message)}`;
