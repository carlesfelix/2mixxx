import { useEffect, useRef } from 'react'
import { type UseClickProps } from './types'

export default function useClick (props: UseClickProps): void {
  const { listener, listen = true } = props
  const listenerRef = useRef<(event: MouseEvent) => void>(listener)
  listenerRef.current = listener

  useEffect(() => {
    function clickListener (event: MouseEvent): void {
      listenerRef.current(event)
    }
    if (listen) {
      window.addEventListener('click', clickListener)
      return () => {
        window.removeEventListener('click', clickListener)
      }
    }
  }, [listenerRef, listen])
}
