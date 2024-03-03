import { useEffect, useRef } from 'react'
import { type UseKeyBoardProps } from './types'

export default function useKeyBoard (props: UseKeyBoardProps): void {
  const { listener, mode = 'keydown', listen = true, code } = props
  const listenerRef = useRef<(event: KeyboardEvent) => void>(listener)
  listenerRef.current = listener

  useEffect(() => {
    function keyboardListener (event: KeyboardEvent): void {
      if (code === undefined || code === event.code) {
        listenerRef.current(event)
      }
    }
    if (listen) {
      window.addEventListener(mode, keyboardListener)
      return () => {
        window.removeEventListener(mode, keyboardListener)
      }
    }
  }, [listenerRef, mode, listen, code])
}
