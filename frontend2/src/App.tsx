import RootLayout from '@/components/layout/RootLayout'
import { KeyboardAccessibilityProvider } from '@/core/core-keyboard-accessibility'
import { BrowserRouter } from '@/core/core-router'
import { QueryProvider } from '@/core/core-query'
import http from '@/singletons/http'
import OAuth2ProviderLayout from '@/components/layout/OAuth2ProviderLayout'
import { ReactElement } from 'react'

function App (): ReactElement {
  return (
    <OAuth2ProviderLayout>
      <QueryProvider http={http}>
        <KeyboardAccessibilityProvider>
          <BrowserRouter>
            <RootLayout />
          </BrowserRouter>
        </KeyboardAccessibilityProvider>
      </QueryProvider>
    </OAuth2ProviderLayout>
  )
}

export default App
