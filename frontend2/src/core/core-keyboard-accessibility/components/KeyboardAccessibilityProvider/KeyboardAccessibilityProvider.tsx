import { FocusEvent, MutableRefObject, ReactElement, useCallback, useEffect, useState } from 'react'
import KeyboardAccessibilityContext from '../../contexts/KeyboardAccessibilityContext'
import { KeyboardAccessibilityContextReturn, KeyboardAccessibilityProviderProps } from '../../types'

export default function KeyboardAccessibilityProvider (
  props: KeyboardAccessibilityProviderProps
): ReactElement {
  const { children } = props
  const [pointerElement, setPointerElement] = useState<Element | null>(null)
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    function pointerDownHandler (event: PointerEvent): void {
      setPointerElement(event.target as Element)
    }

    function keydownHandler (event: KeyboardEvent): void {
      if (event.code === 'Tab') {
        setPointerElement(null)
      }
    }

    window.document.body.addEventListener('pointerdown', pointerDownHandler)
    window.document.body.addEventListener('keydown', keydownHandler)

    return () => {
      window.document.body.removeEventListener('pointerdown', pointerDownHandler)
      window.document.body.removeEventListener('keydown', keydownHandler)
    }
  }, [setPointerElement])

  const focus = useCallback((event?: FocusEvent<HTMLElement>) => {
    if (event === undefined) {
      setHighlightedElement(null)
    } else if (
      event.target !== pointerElement &&
      !event.target.contains(pointerElement)
    ) {
      setHighlightedElement(event.target)
    }
  }, [pointerElement])

  const highlight = useCallback((element: HTMLElement | null) => {
    setHighlightedElement(element)
  }, [setHighlightedElement])

  const blur = useCallback((event?: FocusEvent<HTMLElement>) => {
    setHighlightedElement(old => {
      if (!event || old === event.target) {
        return null
      }
      return old
    })
  }, [setHighlightedElement])

  const isHighlighted = useCallback((elementRef: MutableRefObject<HTMLElement | null>) => {
    return elementRef.current !== null && highlightedElement === elementRef.current
  }, [highlightedElement])

  const value: KeyboardAccessibilityContextReturn = {
    blur,
    focus,
    isHighlighted,
    pointedElement: pointerElement,
    highlightedElement,
    highlight
  }

  return (
    <KeyboardAccessibilityContext.Provider value={value}>
      {children}
    </KeyboardAccessibilityContext.Provider>
  )
}
