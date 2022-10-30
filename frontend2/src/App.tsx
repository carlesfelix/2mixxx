import RootLayout from "@/components/layout/RootLayout";
import { BrowserRouter } from "react-router-dom";
import { PointerElementProvider } from "./core/core-pointer-element";

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
