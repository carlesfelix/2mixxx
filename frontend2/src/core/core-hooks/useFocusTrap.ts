import { RefObject, useEffect } from 'react'
import { tabbable } from 'tabbable'

export default function useFocusTrap<
  RootElement extends HTMLElement
> (ref: RefObject<RootElement>): void {
  useEffect(() => {
    const currentRef = ref.current
    function keydownHandler (event: KeyboardEvent): void {
      if (event.code === 'Tab' && currentRef) {
        const focusableElements = tabbable(currentRef)
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

    currentRef?.addEventListener('keydown', keydownHandler)
    return () => {
      currentRef?.removeEventListener('keydown', keydownHandler)
    }
  }, [ref])
}
