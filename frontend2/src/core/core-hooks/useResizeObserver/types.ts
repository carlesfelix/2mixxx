import { type RefObject } from 'react'

export interface Size {
  width: number | undefined
  height: number | undefined
}

export interface UseResizeObserverOptions<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T>
  onResize?: (size: Size) => void
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box'

}

export type UseResizeObserverReturn = Size
