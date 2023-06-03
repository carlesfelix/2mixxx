import RootLayout from '@/components/layout/RootLayout'
import { PointerElementProvider } from '@/core/core-pointer-element'
import { BrowserRouter } from '@/core/core-router'
import { QueryProvider } from '@/core/core-query'
import { ListenKeyboardProvider } from '@/core/core-listen-keyboard'
import http from '@/singletons/http'
import OAuth2ProviderLayout from '@/components/layout/OAuth2ProviderLayout'
import { ReactElement } from 'react'

function App (): ReactElement {
  return (
    <OAuth2ProviderLayout>
      <QueryProvider http={http}>
        <ListenKeyboardProvider>
          <PointerElementProvider>
            <BrowserRouter>
              <RootLayout />
            </BrowserRouter>
          </PointerElementProvider>
        </ListenKeyboardProvider>
      </QueryProvider>
    </OAuth2ProviderLayout>
  )
}

export default App
