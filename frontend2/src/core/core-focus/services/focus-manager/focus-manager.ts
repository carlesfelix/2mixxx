import { type FocusableElement, tabbable } from 'tabbable'
import { type RestoreFocusAction, type FocusManagerReturn } from './types'
import { clearCurrentFocusVisible, isFocusVisible, matchDefaultKeyboardConfig, matchDefaultNextKeyboardConfig, matchDefaultPrevKeyboardConfig, matchKeyboardConfig, setFocusVisibility } from '../utils'
import { type PointerDownAction, type FocusNavigationAction } from '../../types'

export default function focusManager (focusVisibleDataKey: string): FocusManagerReturn {
  let pointerDownEventTarget: EventTarget | null = null
  let pointerDownActions: PointerDownAction[] = []
  let focusFromKeyboard = false
  let focusNavigationActions: FocusNavigationAction[] = []
  let restoreFocusAction: RestoreFocusAction | null = null
  let forceFocusVisible = true
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const oldHTMLFocus = window.HTMLElement.prototype.focus
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const oldSVGFocus = window.SVGElement.prototype.focus
  function focusElement (event: KeyboardEvent, focusableElement?: FocusableElement): void {
    if (focusableElement) {
      focusableElement.focus()
      event.preventDefault()
    }
  }
  function keydownHandler (event: KeyboardEvent): void {
    focusFromKeyboard = true
    const currentFocusNavigationActions = focusNavigationActions
    focusNavigationActions = []
    const focusableElements = tabbable(window.document.body)
    const currentFocusIndex = focusableElements.findIndex((focusableElement) => focusableElement === window.document.activeElement)
    if (currentFocusIndex === -1) {
      if (restoreFocusAction) {
        if (matchKeyboardConfig(event, restoreFocusAction.keyboardNavigationSettings.next)) {
          focusElement(event, focusableElements.at(restoreFocusAction.index.next))
          restoreFocusAction = null
        } else if (matchKeyboardConfig(event, restoreFocusAction.keyboardNavigationSettings.prev)) {
          focusElement(event, focusableElements.at(restoreFocusAction.index.prev))
          restoreFocusAction = null
        } else {
          event.preventDefault()
        }
      } else if (matchDefaultNextKeyboardConfig(event)) {
        focusElement(event, focusableElements.at(0))
      } else if (matchDefaultPrevKeyboardConfig(event)) {
        focusElement(event, focusableElements.at(-1))
      }
      return
    }
    const focusNavigationAction = currentFocusNavigationActions.find(eachFocusNavigationAction => eachFocusNavigationAction.eventTarget === event.target)
    if (focusNavigationAction === undefined) {
      return
    }
    if (!focusNavigationAction.match) {
      if (matchDefaultKeyboardConfig(event)) {
        event.preventDefault()
      }
      return
    }
    const offset = currentFocusIndex + focusNavigationAction.offset
    focusElement(event, focusableElements.at(offset))
  }
  function focusoutHandler (event: FocusEvent): void {
    clearCurrentFocusVisible(focusVisibleDataKey)
    setFocusVisibility(event.target, false, focusVisibleDataKey)
  }
  function pointerDownHandler (event: MouseEvent): void {
    const currentPointerDownActions = pointerDownActions
    pointerDownActions = []
    const currentPointerDownAction = currentPointerDownActions.find(
      (eachCurrentPointerDownAction) => eachCurrentPointerDownAction.element.contains(event.target as Node)
    )
    if (currentPointerDownAction) {
      const focusableElements = tabbable(window.document.body)
      const childFocusableElements = tabbable(currentPointerDownAction.element)
      const firstChildFocusableElement = childFocusableElements.at(0)
      const lastChildFocusableElement = childFocusableElements.at(-1)
      const firstChildFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === firstChildFocusableElement)
      const lastChildFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === lastChildFocusableElement)
      if (firstChildFocusableElementIndex !== -1 && lastChildFocusableElementIndex !== -1) {
        restoreFocusAction = {
          index: {
            next: firstChildFocusableElementIndex,
            prev: currentPointerDownAction.trap ? lastChildFocusableElementIndex : firstChildFocusableElementIndex - 1
          },
          keyboardNavigationSettings: currentPointerDownAction.keyboardNavigationSettings
        }
      }
    }
    pointerDownEventTarget = event.target
    focusFromKeyboard = false
  }
  function focusinHandler (event: FocusEvent): void {
    const isFocusVisible = (
      (focusFromKeyboard || forceFocusVisible) &&
      !!(
        event.target &&
        event.target !== pointerDownEventTarget &&
        !(event.target as Node).contains(pointerDownEventTarget as Node)
      )
    )
    if (
      (
        (event.target instanceof HTMLInputElement) ||
        (event.target instanceof HTMLTextAreaElement)
      ) ||
      isFocusVisible
    ) {
      setFocusVisibility(event.target, true, focusVisibleDataKey)
    }
    focusFromKeyboard = false
    pointerDownEventTarget = null
    forceFocusVisible = true
    restoreFocusAction = null
  }
  function onKeyDown (focusNavigationAction: FocusNavigationAction): void {
    focusNavigationActions.push(focusNavigationAction)
  }
  function onPointerDown (pointerDownAction: PointerDownAction): void {
    pointerDownActions.push(pointerDownAction)
  }
  function listen (): void {
    window.HTMLElement.prototype.focus = function (...args): void {
      forceFocusVisible = isFocusVisible(focusVisibleDataKey)
      oldHTMLFocus.call(this, ...args)
    }
    window.SVGElement.prototype.focus = function (...args): void {
      forceFocusVisible = isFocusVisible(focusVisibleDataKey)
      oldSVGFocus.call(this, ...args)
    }
    window.document.addEventListener('keydown', keydownHandler)
    window.document.addEventListener('focusin', focusinHandler)
    window.document.addEventListener('focusout', focusoutHandler)
    window.document.addEventListener('pointerdown', pointerDownHandler)
  }
  function unlisten (): void {
    window.document.removeEventListener('keydown', keydownHandler)
    window.document.removeEventListener('focusin', focusinHandler)
    window.document.removeEventListener('focusout', focusoutHandler)
    window.document.removeEventListener('pointerdown', pointerDownHandler)
    pointerDownEventTarget = null
    pointerDownActions = []
    focusFromKeyboard = false
    focusNavigationActions = []
    restoreFocusAction = null
    forceFocusVisible = true
    window.HTMLElement.prototype.focus = oldHTMLFocus
    window.SVGElement.prototype.focus = oldSVGFocus
  }
  return {
    listen,
    unlisten,
    onKeyDown,
    onPointerDown
  }
}
