export type KeyboardCallback = () => void

export type UnlistenKeyboard = () => void

export type KeyboardMode = 'keydown' | 'keyup'

export interface KeyboardListener {
  code: string
  once?: boolean
  callback: KeyboardCallback
}

export interface UseListenKeyboardReturn {
  onKeyboard: (keyboardListener: KeyboardListener) => UnlistenKeyboard
}
