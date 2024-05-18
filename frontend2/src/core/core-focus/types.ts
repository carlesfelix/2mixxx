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
