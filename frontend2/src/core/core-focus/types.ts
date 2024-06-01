import { type FocusableElement } from './services/focusable-elements'

export interface FocusNavigationAction {
  offset: number
  match: boolean
  eventTarget: EventTarget | null
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
