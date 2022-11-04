import RootLayout from "@/components/layout/RootLayout";
import { PointerElementProvider } from "./core/core-pointer-element";
import { BrowserRouter } from "@/core/core-router";

function App() {
  return (
    <PointerElementProvider>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    </PointerElementProvider>
  );
}

export default App;
