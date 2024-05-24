export interface KeyboardNavigationConfig {
  code: string
  shiftKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  metaKey?: boolean
}

export interface FocusNavigationAction {
  offset: number
  match: boolean
  eventTarget: EventTarget | null
}
