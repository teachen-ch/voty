import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import de from "./de";
import bg from "./bg";
import { tenant } from "../tenant";

export const LOCALE_STORAGE_KEY = "civictools-locale";
export const supportedLocales = ["en", "bg"] as const;
export type Locale = (typeof supportedLocales)[number];

function getInitialLocale(): Locale {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return supportedLocales.includes(storedLocale as Locale)
    ? (storedLocale as Locale)
    : tenant.locale;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    bg: { translation: bg },
  },
  lng: getInitialLocale(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
