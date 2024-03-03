import { type FocusEvent, type MutableRefObject, type ReactNode } from 'react'
import { type FocusableElement } from 'tabbable'

export interface KeyboardAccessibilityProviderProps {
  children: ReactNode
}

export interface InstanceRefWithFocus {
  focus: () => void
}

export interface UseAutoHighlightWithKeyboardProps<InstanceRef extends InstanceRefWithFocus | null> {
  targetElementRef: MutableRefObject<HTMLElement | null>
  isVisible: boolean
  ref: MutableRefObject<InstanceRef>
  keyboardCodes: string[]
}

export interface UseHighlightReturnWithKeyboardProps<InstanceRef extends InstanceRefWithFocus | null> {
  keyboardCodes: string[]
  isVisible: boolean
  ref: MutableRefObject<InstanceRef>
}

export interface KeyboardAccessibilityContextReturn {
  pointedElementRef: MutableRefObject<Element | null>
  updatePointedElement: (element: Element | null) => void
  highlightedElement: FocusableElement | null
  isHighlighted: (elementRef: MutableRefObject<Element | null>) => boolean
  focus: (event: FocusEvent) => void
  blur: () => void
  highlight: (element: FocusableElement | null) => void
}

export interface FocusWithKeyboardProps {
  children: ReactNode
  nextCode?: string
  previousCode?: string
  trap?: boolean
  disabled?: boolean
  className?: string
}

export interface FocusWithKeyboardRef {
  focus: () => void
}
