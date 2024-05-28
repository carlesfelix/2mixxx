import { KEY_CODES } from '@/core/core-keyboard'
import { type KeyboardNavigationConfig } from '../../types'

export function setFocusVisibility (
  element: Element | EventTarget | null,
  visibility: boolean,
  focusVisibleDataKey: string
): void {
  if (
    (element instanceof HTMLElement) ||
    (element instanceof SVGElement)
  ) {
    setFocusableElementVisibility(element, visibility, focusVisibleDataKey)
  }
}

export function getFocusVisibleDataAttribute (focusVisibleDataKey: string): string {
  return `data-${focusVisibleDataKey}`
}

export function setFocusableElementVisibility (
  focusableElement: HTMLElement | SVGElement,
  visibility: boolean,
  focusVisibleDataKey: string
): void {
  if (visibility) {
    focusableElement.setAttribute(getFocusVisibleDataAttribute(focusVisibleDataKey), '')
  } else {
    focusableElement.removeAttribute(getFocusVisibleDataAttribute(focusVisibleDataKey))
  }
}

export function getFocusVisibleElement (focusVisibleDataKey: string): Element | null {
  return window.document.querySelector(`[${getFocusVisibleDataAttribute(focusVisibleDataKey)}]`)
}

export function isFocusVisible (focusVisibleDataKey: string): boolean {
  return !!getFocusVisibleElement(focusVisibleDataKey)
}

export function clearCurrentFocusVisible (focusVisibleDataKey: string): void {
  const element = getFocusVisibleElement(focusVisibleDataKey)
  setFocusVisibility(element, false, focusVisibleDataKey)
}

export function matchKeyboardConfig (
  event: KeyboardEvent,
  keyboardNavigationConfig: KeyboardNavigationConfig
): boolean {
  const {
    code,
    altKey = false,
    ctrlKey = false,
    metaKey = false,
    shiftKey = false
  } = keyboardNavigationConfig
  return event.code === code &&
    event.altKey === altKey &&
    event.ctrlKey === ctrlKey &&
    event.metaKey === metaKey &&
    event.shiftKey === shiftKey
}

export function matchDefaultNextKeyboardConfig (event: KeyboardEvent): boolean {
  return matchKeyboardConfig(event, { code: KEY_CODES.Tab })
}

export function matchDefaultPrevKeyboardConfig (event: KeyboardEvent): boolean {
  return matchKeyboardConfig(event, { code: KEY_CODES.Tab, shiftKey: true })
}

export function matchDefaultKeyboardConfig (event: KeyboardEvent): boolean {
  return (
    matchDefaultPrevKeyboardConfig(event) ||
    matchDefaultNextKeyboardConfig(event)
  )
}
