import { type FocusableElement } from './services/focusable-elements'

export type FocusNavigationLimits = [FocusableElement | undefined, FocusableElement | undefined]
export interface FocusNavigationAction {
  offset: number
  match: boolean
  eventTarget: EventTarget | null
  limits?: FocusNavigationLimits
}

export type RestoreFocusCallbackReturn = FocusableElement | number | null | undefined

export type RestoreFocusCallback = (
  event: KeyboardEvent,
  allFocusableElements: FocusableElement[]
) => RestoreFocusCallbackReturn

export interface PointerDownAction {
  element: Element
  restoreFocusCallback: RestoreFocusCallback
}
