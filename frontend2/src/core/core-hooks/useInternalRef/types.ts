import { type MutableRefObject } from 'react'

export type UseInternalRefReturn<T> = [(nextRef: T) => void, MutableRefObject<T | null>]
