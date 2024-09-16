import i18n from "i18next"; // Importo i18next per gestire le traduzioni nell'applicazione
import { initReactI18next } from "react-i18next"; // Importo il binding per React

i18n
  .use(initReactI18next) // Utilizzo il plugin initReactI18next per integrare i18next con React
  .init({
    fallbackLng: "en", // Definisco la lingua di default (fallback) come inglese
    lng: "en", // Imposto la lingua iniziale dell'applicazione su inglese
    supportedLngs: ["en", "it"], // Elenco delle lingue supportate nell'app (inglese e italiano)
    // debug: true, // (Commentato) Abilita il debug per vedere eventuali problemi di configurazione nella console
    interpolation: {
      escapeValue: false, // Evita di fare l'escape dei valori, poiché React gestisce già la sicurezza del contenuto
    },
    resources: {
      // Risorse di traduzione per le lingue supportate (inglese e italiano)
      en: {
        translation: {
          language: "Language",
          dark_mode: "Dark Mode",
          light_mode: "Light Mode",
          user_profile: "User Profile",
          english: "English",
          italian: "Italiano",
          dashboard: "Dashboard",
          apartments: "Apartments",
          no_apartments_message: "No apartments available. Add a new apartment!",
          pricing_plans: "Pricing Plans",
          our_pricing_plans: "Our Pricing Plans",
          basic_plan: "Basic",
          basic_plan_description: "Ideal for managing up to 4 apartments",
          medium_plan: "Medium",
          medium_plan_description: "Ideal for managing up to 8 apartments",
          premium_plan: "Premium",
          premium_plan_description: "Ideal for managing up to 20 apartments",
          choose_plan: "Choose Plan",
          month: "month",
          add_apartment: "Add Apartment",
          name: "Name",
          street: "Street",
          number: "Number",
          city: "City",
          floor_staircase: "Floor/Staircase",
          postal_code: "Postal Code",
          prefix: "Prefix",
          phone: "Phone",
          surname: "Surname",
          edit_apartment: "Edit Apartment",
          link_duration: "Link Duration",
          fixed_link: "Fixed Link",
          select_period: "Select Period",
          generate: "Generate",
          save: "Save",
          edit: "Edit",
          delete_apartment: "Delete Apartment",
          cannot_generate_again: "Cannot generate again",
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
          dashboard: "Dashboard",
          apartments: "Appartamenti",
          no_apartments_message: "Non ci sono appartamenti disponibili. Aggiungi un nuovo appartamento!",
          pricing_plans: "Piani di Pagamento",
          our_pricing_plans: "I nostri piani tariffari",
          basic_plan: "Base",
          basic_plan_description: "Ideale per gestire fino a 4 appartamenti",
          medium_plan: "Medio",
          medium_plan_description: "Ideale per gestire fino a 8 appartamenti",
          premium_plan: "Premium",
          premium_plan_description: "Ideale per gestire fino a 20 appartamenti",
          choose_plan: "Scegli il piano",
          month: "mese",
          add_apartment: "Aggiungi Appartamento",
          name: "Nome",
          street: "Via",
          number: "N*",
          city: "Città",
          floor_staircase: "Piano/scala",
          postal_code: "Codice postale",
          prefix: "Pref",
          phone: "Telefono",
          surname: "Cognome",
          edit_apartment: "Modifica Appartamento",
          link_duration: "Durata link",
          fixed_link: "Link fisso",
          select_period: "Seleziona periodo",
          generate: "Genera",
          save: "Salva",
          edit: "Modifica",
          delete_apartment: "Elimina Appartamento",
          cannot_generate_again: "Impossibile generare di nuovo",
        },
      },
    },
  });

export default i18n; // Esporto la configurazione di i18n per l'uso nell'applicazione
