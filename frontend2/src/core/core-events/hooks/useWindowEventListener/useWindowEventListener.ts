import { useEffect, useRef } from 'react'

export default function useWindowEventListener<
  TEventType extends keyof WindowEventMap
> (
  eventType: TEventType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (ev: WindowEventMap[TEventType]) => any
): void {
  const listenerRef = useRef<(event: WindowEventMap[TEventType]) => void>(listener)
  listenerRef.current = listener

  useEffect(() => {
    function eventHandler (event: WindowEventMap[TEventType]): void {
      listenerRef.current(event)
    }
    window.addEventListener(eventType, eventHandler)
    return () => {
      window.removeEventListener(eventType, eventHandler)
    }
  }, [eventType])
}
