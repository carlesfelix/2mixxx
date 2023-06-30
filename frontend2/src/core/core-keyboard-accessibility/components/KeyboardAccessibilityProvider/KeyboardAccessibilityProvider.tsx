import { FocusEvent, MutableRefObject, ReactElement, useCallback, useRef, useState } from 'react'
import { FocusableElement, isFocusable } from 'tabbable'
import KeyboardAccessibilityContext from '../../contexts/KeyboardAccessibilityContext'
import { KeyboardAccessibilityContextReturn, KeyboardAccessibilityProviderProps } from '../../types'

export default function KeyboardAccessibilityProvider (
  props: KeyboardAccessibilityProviderProps
): ReactElement {
  const { children } = props
  const pointedElementRef = useRef<Element | null>(null)
  const [highlightedElement, setHighlightedElement] = useState<FocusableElement | null>(null)

  const updatePointedElement = useCallback((element: Element | null) => {
    pointedElementRef.current = element
  }, [pointedElementRef])

  const focus = useCallback((event?: FocusEvent) => {
    if (event === undefined) {
      setHighlightedElement(null)
    } else if (
      event.target !== pointedElementRef.current &&
      !event.target.contains(pointedElementRef.current) &&
      isFocusable(event.target)
    ) {
      setHighlightedElement(event.target as FocusableElement)
    }
  }, [pointedElementRef])

  const highlight = useCallback((element: FocusableElement | null) => {
    setHighlightedElement(element)
  }, [setHighlightedElement])

  const blur = useCallback((event?: FocusEvent) => {
    setHighlightedElement(old => {
      if (!event || old === event.target) {
        return null
      }
      return old
    })
  }, [setHighlightedElement])

  const isHighlighted = useCallback((elementRef: MutableRefObject<Element | null>) => {
    return elementRef.current !== null && highlightedElement === elementRef.current
  }, [highlightedElement])

  const value: KeyboardAccessibilityContextReturn = {
    blur,
    focus,
    isHighlighted,
    pointedElementRef,
    updatePointedElement,
    highlightedElement,
    highlight
  }

  return (
    <KeyboardAccessibilityContext.Provider value={value}>
      {children}
    </KeyboardAccessibilityContext.Provider>
  )
}