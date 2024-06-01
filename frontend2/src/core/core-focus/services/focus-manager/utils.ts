import { isFocusable, type FocusableElement } from '../focusable-elements'

export function setFocusVisibility (
  element: Element | EventTarget | null,
  visibility: boolean,
  focusVisibleDataKey: string
): void {
  if (element instanceof Element && isFocusable(element)) {
    setFocusableElementVisibility(element as FocusableElement, visibility, focusVisibleDataKey)
  }
}

export function getFocusVisibleDataAttribute (focusVisibleDataKey: string): string {
  return `data-${focusVisibleDataKey}`
}

export function setFocusableElementVisibility (
  focusableElement: FocusableElement,
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

export function clearCurrentFocusVisible (focusVisibleDataKey: string): void {
  const element = getFocusVisibleElement(focusVisibleDataKey)
  setFocusVisibility(element, false, focusVisibleDataKey)
}
