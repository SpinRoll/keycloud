import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Bind per React
  .init({
    fallbackLng: "en", // Lingua di default
    lng: "en", // Lingua iniziale
    supportedLngs: ["en", "it"], // Lingue supportate
    // debug: true, // Abilita il debug per vedere eventuali problemi di configurazione nella console
    interpolation: {
      escapeValue: false, // React già esegue il santizing del contenuto
    },
    resources: {
      en: {
        translation: {
          language: "Language",
          dark_mode: "Dark Mode",
          light_mode: "Light Mode",
          user_profile: "User Profile",
          english: "English",
          italian: "Italiano",
        },
      },
      it: {
        translation: {
          language: "Lingua",
          dark_mode: "Modalità Scura",
          light_mode: "Modalità Chiara",
          user_profile: "Profilo Utente",
          english: "Inglese",
          italian: "Italiano",
        },
      },
    },
  });

export default i18n;
