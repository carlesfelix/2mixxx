import { type FocusableElement, tabbable } from 'tabbable'
import { type FocusManagerReturn } from './types'
import { clearCurrentFocusVisible, matchDefaultKeyboardConfig, matchDefaultNextKeyboardConfig, matchDefaultPrevKeyboardConfig, setFocusVisibility } from '../utils'
import { type FocusNavigationAction } from '../../types'

export default function focusManager (focusVisibleDataKey: string): FocusManagerReturn {
  let pointerDownEventTarget: EventTarget | null = null
  let focusFromKeyboard = false
  let focusNavigationActions: FocusNavigationAction[] = []
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
      if (matchDefaultNextKeyboardConfig(event)) {
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
    if (offset >= 0 && offset < focusableElements.length) {
      focusElement(event, focusableElements.at(offset))
    }
  }
  function focusoutHandler (event: FocusEvent): void {
    clearCurrentFocusVisible(focusVisibleDataKey)
    setFocusVisibility(event.target, false, focusVisibleDataKey)
  }
  function pointerDownHandler (event: MouseEvent): void {
    pointerDownEventTarget = event.target
  }
  function focusinHandler (event: FocusEvent): void {
    focusFromKeyboard = focusFromKeyboard && !!(
      event.target &&
      event.target !== pointerDownEventTarget &&
      !(event.target as Node).contains(pointerDownEventTarget as Node)
    )
    if (
      (
        (event.target instanceof HTMLInputElement) ||
        (event.target instanceof HTMLTextAreaElement)
      ) ||
      focusFromKeyboard
    ) {
      setFocusVisibility(event.target, true, focusVisibleDataKey)
    }
    focusFromKeyboard = false
    pointerDownEventTarget = null
  }
  function onKeyDown (focusNavigationAction: FocusNavigationAction): void {
    focusNavigationActions.push(focusNavigationAction)
  }
  function listen (): void {
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
    focusFromKeyboard = false
    focusNavigationActions = []
  }
  return {
    listen,
    unlisten,
    onKeyDown
  }
}
