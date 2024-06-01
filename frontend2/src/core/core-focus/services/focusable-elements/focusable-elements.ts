import { tabbable, isFocusable as libIsFocusable } from 'tabbable'
import { type FocusableElement } from './types'

export function getFocusableElements (container: Element): FocusableElement[] {
  return tabbable(container)
}

export function isFocusable (container: Element): boolean {
  return libIsFocusable(container)
}
