import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  initReactI18next,
  useTranslation as _useTranslation,
  UseTranslationResponse,
  UseTranslationOptions,
  DefaultNamespace,
  Namespace,
  KeyPrefix,
  TFunction as _TFunction
} from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';

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

export function useLanguage(): { short: string, full: string } {
  const [ lang, setLang ] = useState<string>(i18n.language);
  useEffect(() => {
    function languageHandler(language: string): void {
      setLang(language);
    }
    i18n.on('languageChanged', languageHandler);
    return () => {
      i18n.off('languageChanged', languageHandler);
    };
  }, []);
  return { short: i18n.resolvedLanguage, full: lang };
}

export type TFunction = _TFunction;
