import { useCallback, useEffect, useRef } from 'react'
import { KeyboardListener, KeyboardMode, UseListenKeyboardReturn } from './types'
import { unlisten } from './utils'

export default function useListenKeyboard (mode: KeyboardMode): UseListenKeyboardReturn {
  const keyboardListeners = useRef<KeyboardListener[]>([])

  useEffect(() => {
    function keyboardEventListener (keyboardEvent: KeyboardEvent): void {
      keyboardListeners.current.forEach(keyboardListener => {
        if (keyboardEvent.code === keyboardListener.code) {
          keyboardListener.callback()
          keyboardListener.once && unlisten(keyboardListeners, keyboardListener)
        }
      })
    }
    window.addEventListener(mode, keyboardEventListener)

    return () => {
      window.removeEventListener(mode, keyboardEventListener)
    }
  }, [mode, keyboardListeners])

  const onKeyboard = useCallback((keyboardListener: KeyboardListener) => {
    keyboardListeners.current.push(keyboardListener)
    return () => {
      unlisten(keyboardListeners, keyboardListener)
    }
  }, [keyboardListeners])

  return {
    onKeyboard
  }
}
