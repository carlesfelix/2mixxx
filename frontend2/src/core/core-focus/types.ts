export interface KeyboardNavigationConfig {
  code: string
  shiftKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  metaKey?: boolean
}

export interface KeyboardNavigationSettings {
  prev: KeyboardNavigationConfig
  next: KeyboardNavigationConfig
  top?: KeyboardNavigationConfig
  bottom?: KeyboardNavigationConfig
}

export interface FocusNavigationAction {
  offset: number
  match: boolean
  eventTarget: EventTarget | null
}

export interface PointerDownAction {
  element: Element
  keyboardNavigationSettings: KeyboardNavigationSettings
  trap: boolean
}
