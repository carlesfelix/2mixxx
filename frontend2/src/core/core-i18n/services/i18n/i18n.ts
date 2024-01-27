import i18n, { i18n as LibI18n } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { TranslationsImportFn } from './types'

export function buildI18n (
  translationsImportFn: TranslationsImportFn,
  fallbackLng?: string
): LibI18n {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  i18n
    .use(LanguageDetector)
    .use(resourcesToBackend(translationsImportFn))
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      fallbackLng,
      interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      }
    })

  return i18n
}
