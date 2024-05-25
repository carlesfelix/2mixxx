import { type PointerDownAction, type FocusNavigationAction, type KeyboardNavigationSettings } from '../../types'

export interface FocusManagerReturn {
  listen: () => void
  unlisten: () => void
  onKeyDown: (focusNavigationAction: FocusNavigationAction) => void
  onPointerDown: (pointerDownAction: PointerDownAction) => void
}

export interface RestoreFocusIndexAction {
  next: number
  prev: number
  top?: number
  bottom?: number
}

export interface RestoreFocusAction {
  index: RestoreFocusIndexAction
  keyboardNavigationSettings: KeyboardNavigationSettings
}
