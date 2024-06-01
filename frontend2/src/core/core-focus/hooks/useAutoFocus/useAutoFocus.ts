import { useEffect } from 'react'
import { getFocusableElements } from '../../services/focusable-elements'

export default function useAutoFocus (
  element: Element | null,
  autoFocus?: number
): void {
  useEffect(() => {
    if (element !== null && typeof autoFocus === 'number') {
      const focusableElements = getFocusableElements(element)
      const focusableElement = focusableElements.at(autoFocus)
      focusableElement?.focus()
    }
  }, [element, autoFocus])
}
