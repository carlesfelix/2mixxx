import RootLayout from '@/components/layout/RootLayout'
import { PointerElementProvider } from '@/core/core-pointer-element'
import { BrowserRouter } from '@/core/core-router'
import { QueryProvider } from '@/core/core-query'
import http from '@/singletons/http'

function App () {
  return (
    <QueryProvider http={http}>
      <PointerElementProvider>
        <BrowserRouter>
          <RootLayout />
        </BrowserRouter>
      </PointerElementProvider>
    </QueryProvider>
  )
}

export default App
