import { MutableRefObject } from 'react'
import { KeyboardListener } from './types'

export function unlisten (
  registeredListeners: MutableRefObject<KeyboardListener[]>,
  keyboardListener: KeyboardListener
): void {
  const nextListeners: KeyboardListener[] = []
  registeredListeners.current.forEach(registeredKeyboardListener => {
    if (registeredKeyboardListener !== keyboardListener) {
      nextListeners.push(registeredKeyboardListener)
    }
  })
  registeredListeners.current = nextListeners
}
