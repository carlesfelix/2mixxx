import { type FocusManagerReturn } from './types'
import { type PointerDownAction, type FocusNavigationAction, type RestoreFocusCallback } from '../../types'
import { type FocusableElement, getFocusableElements } from '../focusable-elements'
import { clearCurrentFocusVisible, setFocusVisibility } from './utils'
import { matchDefaultKeyboardFilter, matchDefaultNextKeyboardKeyFilter, matchDefaultPrevKeyboardKeyFilter } from '../utils'

export default function focusManager (focusVisibleDataKey: string): FocusManagerReturn {
  let pointerDownEventTarget: EventTarget | null = null
  let pointerDownActions: PointerDownAction[] = []
  let focusFromKeyboard = false
  let focusNavigationActions: FocusNavigationAction[] = []
  let restoreFocusCallback: RestoreFocusCallback | null = null
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
    const focusableElements = getFocusableElements(window.document.body)
    const currentFocusIndex = focusableElements.findIndex((focusableElement) => focusableElement === window.document.activeElement)
    if (currentFocusIndex === -1) {
      if (restoreFocusCallback) {
        const restoreFocusAction = restoreFocusCallback(event, focusableElements)
        if (typeof restoreFocusAction === 'number') {
          focusElement(event, focusableElements.at(restoreFocusAction))
        } else if (restoreFocusAction) {
          focusElement(event, restoreFocusAction)
        } else {
          event.preventDefault()
        }
        if (restoreFocusAction) {
          restoreFocusCallback = null
        }
      } else if (matchDefaultNextKeyboardKeyFilter(event)) {
        focusElement(event, focusableElements.at(0))
      } else if (matchDefaultPrevKeyboardKeyFilter(event)) {
        focusElement(event, focusableElements.at(-1))
      }
      return
    }
    const focusNavigationAction = currentFocusNavigationActions.find(eachFocusNavigationAction => eachFocusNavigationAction.eventTarget === event.target)
    if (focusNavigationAction === undefined) {
      return
    }
    if (!focusNavigationAction.match) {
      if (matchDefaultKeyboardFilter(event)) {
        event.preventDefault()
      }
      return
    }
    const offset = currentFocusIndex + focusNavigationAction.offset
    focusElement(event, focusableElements.at(offset))
  }
  function focusoutHandler (event: FocusEvent): void {
    setFocusVisibility(event.target, false, focusVisibleDataKey)
  }
  function pointerDownHandler (event: MouseEvent): void {
    const currentPointerDownActions = pointerDownActions
    pointerDownActions = []
    const currentPointerDownAction = currentPointerDownActions.find(
      (eachCurrentPointerDownAction) => eachCurrentPointerDownAction.element.contains(event.target as Node)
    )
    restoreFocusCallback = currentPointerDownAction?.restoreFocusCallback ?? null
    pointerDownEventTarget = event.target
    focusFromKeyboard = false
  }
  function focusinHandler (event: FocusEvent): void {
    const showFocus = (
      (
        focusFromKeyboard &&
        (
          event.target !== pointerDownEventTarget &&
          !(event.target as Node).contains(pointerDownEventTarget as Node)
        )
      ) ||
      (
        (event.target instanceof HTMLInputElement) ||
        (event.target instanceof HTMLTextAreaElement)
      )
    )
    if (showFocus) {
      setFocusVisibility(event.target, true, focusVisibleDataKey)
    }
    focusFromKeyboard = false
    pointerDownEventTarget = null
    restoreFocusCallback = null
  }
  function onKeyDown (focusNavigationAction: FocusNavigationAction): void {
    focusNavigationActions.push(focusNavigationAction)
  }
  function onPointerDown (pointerDownAction: PointerDownAction): void {
    pointerDownActions.push(pointerDownAction)
  }
  function listen (): void {
    window.addEventListener('keydown', keydownHandler)
    window.addEventListener('focusin', focusinHandler)
    window.addEventListener('focusout', focusoutHandler)
    window.addEventListener('pointerdown', pointerDownHandler)
  }
  function unlisten (): void {
    window.removeEventListener('keydown', keydownHandler)
    window.removeEventListener('focusin', focusinHandler)
    window.removeEventListener('focusout', focusoutHandler)
    window.removeEventListener('pointerdown', pointerDownHandler)
    pointerDownEventTarget = null
    pointerDownActions = []
    focusFromKeyboard = false
    focusNavigationActions = []
    restoreFocusCallback = null
    clearCurrentFocusVisible(focusVisibleDataKey)
  }
  return {
    listen,
    unlisten,
    onKeyDown,
    onPointerDown
  }
}
