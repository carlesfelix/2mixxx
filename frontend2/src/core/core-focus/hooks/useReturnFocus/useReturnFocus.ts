import { useEffect, useRef } from 'react'
import { isFocusable, type FocusableElement } from 'tabbable'

export default function useReturnFocus (focusable: boolean | FocusableElement | null = false): void {
  const elementRef = useRef<Element | null>(null)
  useEffect(() => {
    elementRef.current = window.document.activeElement
    return () => {
      if (!focusable) {
        return
      }
      if (typeof focusable === 'boolean') {
        if (
          elementRef.current &&
          isFocusable(elementRef.current)
        ) {
          (elementRef.current as FocusableElement).focus()
        }
        return
      }
      focusable.focus()
    }
  }, [focusable])
}
