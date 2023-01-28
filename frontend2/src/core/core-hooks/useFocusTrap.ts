import { useEffect } from 'react'
import { tabbable } from 'tabbable'

export default function useFocusTrap<
  RootElement extends HTMLElement
> (rootElement: RootElement | null): void {
  useEffect(() => {
    function keydownHandler (event: KeyboardEvent): void {
      if (event.code === 'Tab' && rootElement) {
        const focusableElements = tabbable(rootElement)
        const focusableElementsLength = focusableElements.length
        const lastFocusableEl = focusableElementsLength ? focusableElements[focusableElementsLength - 1] : null
        const firstFocusableEl = focusableElements[0] || null
        if (event.shiftKey) {
          if (event.target === firstFocusableEl && lastFocusableEl) {
            event.preventDefault()
            lastFocusableEl.focus()
          }
        } else if (event.target === lastFocusableEl && firstFocusableEl) {
          event.preventDefault()
          firstFocusableEl.focus()
        }
      }
    }

    rootElement?.addEventListener('keydown', keydownHandler)
    return () => {
      rootElement?.removeEventListener('keydown', keydownHandler)
    }
  }, [rootElement])
}
