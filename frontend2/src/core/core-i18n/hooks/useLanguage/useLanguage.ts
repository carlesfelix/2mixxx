import useI18n from '../useI18n'
import { useEffect, useState } from 'react'

export default function useLanguage (): string {
  const i18n = useI18n()
  const [language, setLanguage] = useState(() => i18n.language)
  useEffect(() => {
    function languageHandler (nextLanguage: string): void {
      setLanguage(nextLanguage)
    }
    i18n.on('languageChanged', languageHandler)

    return () => {
      i18n.off('languageChanged', languageHandler)
    }
  }, [i18n])
  return language
}
