import { buildI18n, TranslationsImportFn } from '@/core/core-i18n'

const translationsImportFn: TranslationsImportFn = async (language: string, namespace: string) => {
  const resources: unknown = await import(`../../locales/${language}/${namespace}.json`)
  return resources
}
const i18n = buildI18n(translationsImportFn, 'en')

export default i18n
