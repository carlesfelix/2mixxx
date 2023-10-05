import { FocusEvent, MutableRefObject, ReactNode } from 'react'
import { FocusableElement } from 'tabbable'

export interface KeyboardAccessibilityProviderProps {
  children: ReactNode
}

export interface InstanceRefWithFocus {
  focus: () => void
}

export interface UseAutoHighlightWithKeyboardProps<InstanceRef extends InstanceRefWithFocus | null> {
  targetElement: HTMLElement | null
  isVisible: boolean
  ref: MutableRefObject<InstanceRef>
}

export interface KeyboardAccessibilityContextReturn {
  pointedElementRef: MutableRefObject<Element | null>
  updatePointedElement: (element: Element | null) => void
  highlightedElement: FocusableElement | null
  isHighlighted: (elementRef: MutableRefObject<Element | null>) => boolean
  focus: (event: FocusEvent) => void
  blur: (event?: FocusEvent) => void
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
