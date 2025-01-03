import { useEffect } from 'react'
import { getFocusableElements } from '../../services/focusable-elements'

export default function useAutoFocus (
  element: Element | null,
  autoFocus?: number | false
): void {
  useEffect(() => {
    if (element !== null && typeof autoFocus === 'number') {
      setTimeout(() => {
        const focusableElements = getFocusableElements(element)
        const focusableElement = focusableElements.at(autoFocus)
        focusableElement?.focus()
      }, 0)
    }
  }, [element, autoFocus])
}
