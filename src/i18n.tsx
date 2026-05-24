import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Backend'i import edin

i18n
  .use(Backend) // Backend'i kullan
  .use(initReactI18next)
  .init({
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'tr', // Dil bulunamazsa varsayılan dil
    debug: false, // Geliştirme aşamasında hata ayıklama için
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlar
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
