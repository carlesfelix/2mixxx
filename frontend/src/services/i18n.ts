import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  initReactI18next,
  useTranslation as _useTranslation,
  UseTranslationResponse,
  UseTranslationOptions,
  DefaultNamespace,
  Namespace,
  KeyPrefix
} from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export function setupI18n(): void {
  i18n
    .use(resourcesToBackend((language, namespace, callback) => {
      import(`../locales/${language}/${namespace}.json`)
        .then((resources) => {
          callback(null, resources)
        })
        .catch((error) => {
          callback(error, null)
        })
    }))
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      nsSeparator: ':',
      interpolation: {
        escapeValue: false
      }
    });
}

export function useTranslation<
  N extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<N> = undefined
>(
  nsp?: N | Readonly<N>,
  options?: UseTranslationOptions<TKPrefix>
): UseTranslationResponse<Namespace> {
  return _useTranslation(nsp, options);
}

export function changeLanguage(lang: string): Promise<void> {
  return new Promise((resolve, reject) => {
    i18n.changeLanguage(lang, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
