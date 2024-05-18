import { useLayoutEffect } from 'react'
import { tabbable } from 'tabbable'

export default function useAutoFocus (
  element: Element | null,
  autoFocus?: number
): void {
  useLayoutEffect(() => {
    if (element !== null && typeof autoFocus === 'number') {
      const focusableElements = tabbable(element)
      const focusableElement = focusableElements.at(autoFocus)
      focusableElement?.focus()
    }
  }, [element, autoFocus])
}
