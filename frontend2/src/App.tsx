import RootLayout from '@/components/layout/RootLayout'
import { PointerElementProvider } from '@/core/core-pointer-element'
import { BrowserRouter } from '@/core/core-router'
import { QueryProvider } from '@/core/core-query'
import http from '@/singletons/http'
import OAuth2ProviderLayout from '@/components/layout/OAuth2ProviderLayout'

function App () {
  return (
    <OAuth2ProviderLayout>
      <QueryProvider http={http}>
        <PointerElementProvider>
          <BrowserRouter>
            <RootLayout />
          </BrowserRouter>
        </PointerElementProvider>
      </QueryProvider>
    </OAuth2ProviderLayout>
  )
}

export default App
