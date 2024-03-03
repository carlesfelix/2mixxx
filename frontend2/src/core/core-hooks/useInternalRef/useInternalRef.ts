import { type ForwardedRef, useCallback, useRef } from 'react'
import { type UseInternalRefReturn } from './types'

export default function useInternalRef<T> (ref: ForwardedRef<T>): UseInternalRefReturn<T> {
  const internalRef = useRef<T | null>(null)
  const refCallback = useCallback((nextRef: T) => {
    internalRef.current = nextRef
    if (typeof ref === 'function') {
      ref(nextRef)
    } else if (ref !== null) {
      ref.current = nextRef
    }
  }, [internalRef, ref])
  return [refCallback, internalRef]
}
