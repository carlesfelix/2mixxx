import RootLayout from '@/components/layout/RootLayout'
import { KeyboardAccessibilityProvider } from '@/core/core-keyboard-accessibility'
import { BrowserRouter } from '@/core/core-router'
import { QueryProvider } from '@/core/core-query'
import http from '@/modules/http'
import OAuth2ProviderLayout from '@/components/layout/OAuth2ProviderLayout'
import type { ReactElement } from 'react'
import { I18nProvider } from './core/core-i18n'
import FormConfigWrapper from './components/wrappers/FormConfigWrapper'
import i18n from './modules/i18n'
import Spinner from './components/atoms/Spinner'

function App (): ReactElement {
  return (
    <I18nProvider
      i18n={i18n}
      fallback={
        <div className="g-layout g-layout--center">
          <Spinner color="primary" />
        </div>
      }
    >
      <FormConfigWrapper>
        <OAuth2ProviderLayout>
          <QueryProvider http={http}>
            <KeyboardAccessibilityProvider>
              <BrowserRouter>
                <RootLayout />
              </BrowserRouter>
            </KeyboardAccessibilityProvider>
          </QueryProvider>
        </OAuth2ProviderLayout>
      </FormConfigWrapper>
    </I18nProvider>
  )
}

export default App
