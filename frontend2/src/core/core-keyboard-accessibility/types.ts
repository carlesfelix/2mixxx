import { FocusEvent, MutableRefObject, ReactNode } from 'react'

export interface KeyboardAccessibilityProviderProps {
  children: ReactNode
}

export interface KeyboardAccessibilityContextReturn {
  pointedElement: Element | null
  highlightedElement: HTMLElement | null
  isHighlighted: (elementRef: MutableRefObject<HTMLElement | null>) => boolean
  focus: (event: FocusEvent<HTMLElement>) => void
  blur: (event?: FocusEvent<HTMLElement>) => void
  highlight: (element: HTMLElement | null) => void
}
