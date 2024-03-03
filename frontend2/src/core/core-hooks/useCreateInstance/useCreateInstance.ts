import { type MutableRefObject, useRef } from 'react'

export default function useCreateInstance<T> (
  instanceBuilder: () => T
): MutableRefObject<T> {
  const ref = useRef<T | null>(null)
  if (ref.current === null) {
    ref.current = instanceBuilder()
  }
  return ref as MutableRefObject<T>
}
