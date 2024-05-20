import { type FocusableElement } from 'tabbable'

export interface KeyboardNavigationSettingsItem {
  code: string
  shiftKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  metaKey?: boolean
}

export type KeyboardNavigationSettings = [KeyboardNavigationSettingsItem, KeyboardNavigationSettingsItem]
export type TrapLimit = [FocusableElement, FocusableElement]

export interface KeydownEventStackItem {
  keyboardNavigationSettings: KeyboardNavigationSettings
  trapLimit?: TrapLimit
  eventTarget: EventTarget | null
}

export type CloseEvent<T = Element, E = MouseEvent> = MouseEvent | React.MouseEvent<T, E> | KeyboardEvent | React.KeyboardEvent<T>
