import { tabbable } from 'tabbable'
import { isFocusVisible, setFocusableElementVisibility } from '../../services/utils'
import useFocusContext from '../useFocusContext'
import { useEffect } from 'react'

export default function useAutoFocus (
  element: Element | null,
  autoFocus?: number
): void {
  const { focusVisibleDataKey } = useFocusContext()
  useEffect(() => {
    if (element !== null && typeof autoFocus === 'number') {
      const focusableElements = tabbable(element)
      const focusableElement = focusableElements.at(autoFocus)
      if (isFocusVisible(focusVisibleDataKey) && focusableElement) {
        setFocusableElementVisibility(focusableElement, true, focusVisibleDataKey)
      }
      focusableElement?.focus()
    }
  }, [element, autoFocus, focusVisibleDataKey])
}
