import { FocusEvent, KeyboardEvent, MutableRefObject, ReactNode } from 'react'
import { FocusableElement } from 'tabbable'

export interface KeyboardAccessibilityProviderProps {
  children: ReactNode
}

export interface KeyboardAccessibilityContextReturn {
  pointedElement: Element | null
  highlightedElement: FocusableElement | null
  isHighlighted: (elementRef: MutableRefObject<FocusableElement | null>) => boolean
  focus: (event: FocusEvent<FocusableElement>) => void
  blur: (event?: FocusEvent<FocusableElement>) => void
  highlight: (element: FocusableElement | null) => void
}

export interface NextElementIndexCallbackData {
  currentIndex: number
  event: KeyboardEvent<HTMLDivElement>
  elements: FocusableElement[]
}

export type NextElementIndexCallback = (data: NextElementIndexCallbackData) => number

export interface FocusWithKeyboardProps {
  children: ReactNode
  disabled?: boolean
  nextCode?: string
  previousCode?: string
  nextElementIndexCallback?: NextElementIndexCallback
  trap?: boolean
}
