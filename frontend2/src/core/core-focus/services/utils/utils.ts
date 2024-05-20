import { ACTIVATION_METHOD } from '../../constants'
import { type CloseEvent } from '../../types'

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

export function isKeyboardEvent<T = Element, E = MouseEvent> (event: CloseEvent<T, E>): boolean {
  return (
    event.detail === ACTIVATION_METHOD.KEYBOARD ||
    (
      ('screenX' in event) &&
      ('screenY' in event) &&
      event.screenX === 0 &&
      event.screenY === 0 &&
      event.detail !== ACTIVATION_METHOD.KEYBOARD
    )
  )
}
