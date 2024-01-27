import { i18n as LibI18n } from 'i18next'
import { I18nContext } from 'react-i18next'
import { useContext } from 'react'

export default function useI18n (): LibI18n {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context.i18n
}
