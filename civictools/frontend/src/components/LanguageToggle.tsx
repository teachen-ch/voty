import { useTranslation } from "react-i18next";
import { LOCALE_STORAGE_KEY, supportedLocales, type Locale } from "../i18n";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage as Locale;

  function changeLocale(locale: Locale) {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    void i18n.changeLanguage(locale);
  }

  return (
    <div className="flex items-center gap-1" aria-label="Language">
      {supportedLocales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-slate-300">|</span>}
          <button
            type="button"
            onClick={() => changeLocale(locale)}
            aria-current={currentLocale === locale ? "true" : undefined}
            className={`cursor-pointer hover:underline ${
              currentLocale === locale ? "font-semibold italic" : ""
            }`}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
