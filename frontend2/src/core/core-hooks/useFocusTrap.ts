import { RefObject, useEffect } from "react";
import { tabbable } from "tabbable";

export default function useFocusTrap<RootElement extends HTMLElement>(ref: RefObject<RootElement>): void {
  useEffect(() => {
    function keydownHandler(event: KeyboardEvent): void {
      if (event.code === 'Tab' && ref.current) {
        const focusableElements = tabbable(ref.current);
        const focusableElementsLength = focusableElements.length;
        const lastFocusableEl = focusableElementsLength ? focusableElements[focusableElementsLength - 1] : null;
        const firstFocusableEl = focusableElements[0] || null;
        if (event.shiftKey) {
          if (event.target === firstFocusableEl && lastFocusableEl) {
            event.preventDefault();
            lastFocusableEl.focus();
          }
        } else if (event.target === lastFocusableEl && firstFocusableEl) {
          event.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
    ref.current?.addEventListener('keydown', keydownHandler);
    return () => {
      ref.current?.removeEventListener('keydown', keydownHandler);
    };
  }, [ref]);
}
