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
  const { direction, focusableElements, trapLimit } = params
  const { activeElement } = window.document
  const currentFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === activeElement)
  if (currentFocusableElementIndex !== -1 && activeElement !== null) {
    const nextFocusableElementIndex = currentFocusableElementIndex + direction
    if (trapLimit) {
      const [minTrapLimitElement, maxTrapLimitElement] = trapLimit
      if (direction === -1 && minTrapLimitElement === activeElement) {
        return maxTrapLimitElement
      }
      if (direction === 1 && maxTrapLimitElement === activeElement) {
        return minTrapLimitElement
      }
    }
    return focusableElements[nextFocusableElementIndex] ?? null
  }
  return focusableElements[0] ?? null
}
