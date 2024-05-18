import { type ForwardedRef, useCallback, useState } from 'react'
import { type UseInternalInstanceReturn } from './types'

export default function useInternalInstance<T> (ref: ForwardedRef<T>): UseInternalInstanceReturn<T> {
  const [internalInstance, setInternalInstance] = useState<T | null>(null)
  const refCallback = useCallback((nextRef: T) => {
    setInternalInstance(nextRef)
    if (typeof ref === 'function') {
      ref(nextRef)
    } else if (ref !== null) {
      ref.current = nextRef
    }
  }, [ref])
  return [refCallback, internalInstance]
}
