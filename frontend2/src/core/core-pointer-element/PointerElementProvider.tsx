import { useEffect, useRef } from "react";
import { POINTER_ELEMENT_CONTEXT } from "./constants";
import { PointerElementProviderProps } from "./types";

export default function PointerElementProvider(props: PointerElementProviderProps) {
  const { children } = props;
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    function pointerDownHandler(event: PointerEvent): void {
      elementRef.current = event.target as Element;
    }

    function keydownHandler(event: KeyboardEvent): void {
      if (event.code === 'Tab') {
        elementRef.current = null;
      }
    }

    window.document.body.addEventListener('pointerdown', pointerDownHandler);
    window.document.body.addEventListener('keydown', keydownHandler);

    return () => {
      window.document.body.removeEventListener('pointerdown', pointerDownHandler);
      window.document.body.removeEventListener('keydown', keydownHandler);
    };
  }, [ elementRef ]);

  return (
    <POINTER_ELEMENT_CONTEXT.Provider value={elementRef}>
      {children}
    </POINTER_ELEMENT_CONTEXT.Provider>
  );
}