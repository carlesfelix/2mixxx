import { tabbable } from 'tabbable'
import { useEffect } from 'react'

export default function useAutoFocus (
  element: Element | null,
  autoFocus?: number
): void {
  useEffect(() => {
    if (element !== null && typeof autoFocus === 'number') {
      const focusableElements = tabbable(element)
      const focusableElement = focusableElements.at(autoFocus)
      focusableElement?.focus()
    }
  }, [element, autoFocus])
}
