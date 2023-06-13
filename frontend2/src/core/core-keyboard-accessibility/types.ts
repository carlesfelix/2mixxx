import { FocusEvent, KeyboardEvent, MutableRefObject, ReactNode } from 'react'
import { FocusableElement } from 'tabbable'

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

export interface NextElementIndexCallbackData {
  currentIndex: number
  event: KeyboardEvent<HTMLDivElement>
  elements: FocusableElement[]
}

export type NextElementIndexCallback = (data: NextElementIndexCallbackData) => number

export interface FocusTrapProps {
  children: ReactNode
  disabled?: boolean
  nextCode?: string
  previousCode?: string
  nextElementIndexCallback?: NextElementIndexCallback
}
