import { useEffect } from 'react'
import { type FocusableElement } from '../../services/focusable-elements'

export default function useReturnFocus (focusableElement?: FocusableElement | null): void {
  useEffect(() => {
    return () => {
      if (!focusableElement) {
        return
      }
      focusableElement.focus()
    }
  }, [focusableElement])
}
