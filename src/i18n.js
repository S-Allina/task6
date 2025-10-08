// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; 

import translationEN from './app/data/locales/en.json';
import translationRU from './app/data/locales/ru.json';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;