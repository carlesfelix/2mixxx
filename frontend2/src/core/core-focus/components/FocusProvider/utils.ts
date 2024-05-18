import { type FocusableElement } from 'tabbable'
import { type KeyboardNavigationSettingsItem } from '../../types'
import { type GetNextFocusableElementParams } from './types'

export function matchKeyboardNavigationSetting (
  event: KeyboardEvent,
  settingsItem: KeyboardNavigationSettingsItem
): boolean {
  const { code, altKey = false, ctrlKey = false, metaKey = false, shiftKey = false } = settingsItem
  return event.code === code &&
    event.altKey === altKey &&
    event.ctrlKey === ctrlKey &&
    event.metaKey === metaKey &&
    event.shiftKey === shiftKey
}

export function getNextFocusableElement (
  params: GetNextFocusableElementParams
): FocusableElement | null {
  const { direction, focusableElements, lastFocusEventTarget, trapLimit } = params
  const currentFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === lastFocusEventTarget)
  if (currentFocusableElementIndex !== -1 && lastFocusEventTarget !== null) {
    const nextFocusableElementIndex = currentFocusableElementIndex + direction
    if (trapLimit) {
      const [minTrapLimitElement, maxTrapLimitElement] = trapLimit
      if (direction === -1 && minTrapLimitElement === lastFocusEventTarget) {
        return maxTrapLimitElement
      }
      if (direction === 1 && maxTrapLimitElement === lastFocusEventTarget) {
        return minTrapLimitElement
      }
    }
    return focusableElements[nextFocusableElementIndex] ?? null
  }
  return focusableElements[0] ?? null
}
