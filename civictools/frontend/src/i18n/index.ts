import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import de from './de'
import bg from './bg'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    bg: { translation: bg },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
