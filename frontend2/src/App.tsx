import RootLayout from "@/components/layout/RootLayout";
import { PointerElementProvider } from "@/core/core-pointer-element";
import { BrowserRouter } from "@/core/core-router";
import { QueryApiRestProvider } from "@/core/core-query";
import http from "@/singletons/http";

function App() {
  return (
    <QueryApiRestProvider http={http}>
      <PointerElementProvider>
        <BrowserRouter>
          <RootLayout />
        </BrowserRouter>
      </PointerElementProvider>
    </QueryApiRestProvider>
  );
}

export default App;
