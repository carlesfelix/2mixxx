import { type ReactElement, Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { type I18nProviderProps } from './types'

export default function I18nProvider (props: I18nProviderProps): ReactElement {
  const { children, i18n, fallback } = props
  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </I18nextProvider>
  )
}
