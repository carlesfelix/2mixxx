import { useEffect, useRef } from 'react'

export default function useReturnFocus (disabled = false): void {
  const elementRef = useRef<Element | null>(null)
  useEffect(() => {
    elementRef.current = window.document.activeElement
    return () => {
      if (
        !disabled &&
        elementRef.current &&
        (
          (elementRef.current instanceof HTMLElement) ||
          (elementRef.current instanceof SVGElement)
        )
      ) {
        elementRef.current.focus()
      }
    }
  }, [disabled])
}
