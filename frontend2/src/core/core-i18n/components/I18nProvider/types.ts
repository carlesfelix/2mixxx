import { ReactNode } from 'react'
import { i18n as LibI18n } from 'i18next'

export interface I18nProviderProps {
  children: ReactNode
  i18n: LibI18n
  fallback?: ReactNode
}
