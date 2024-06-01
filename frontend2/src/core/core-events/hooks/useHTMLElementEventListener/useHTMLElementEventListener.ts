import { useEffect, useRef } from 'react'

export default function useHTMLElementEventListener<
  TEventType extends keyof HTMLElementEventMap,
  TElement extends HTMLElement,
> (
  element: TElement | null,
  eventType: TEventType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (ev: HTMLElementEventMap[TEventType]) => any
): void {
  const listenerRef = useRef<(event: HTMLElementEventMap[TEventType]) => void>(listener)
  listenerRef.current = listener

  useEffect(() => {
    function eventHandler (event: HTMLElementEventMap[TEventType]): void {
      listenerRef.current(event)
    }
    if (element) {
      element.addEventListener(eventType, eventHandler)
      return () => {
        element.removeEventListener(eventType, eventHandler)
      }
    }
  }, [element, eventType])
}
