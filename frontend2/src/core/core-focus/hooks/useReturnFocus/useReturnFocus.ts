import { useEffect, useRef } from 'react'
import { type FocusableElement } from 'tabbable'

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
          (
            (elementRef.current instanceof HTMLElement) ||
            (elementRef.current instanceof SVGElement)
          )
        ) {
          elementRef.current.focus()
        }
        return
      }
      focusable.focus()
    }
  }, [focusable])
}
