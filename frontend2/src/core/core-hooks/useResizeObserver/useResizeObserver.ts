import { useResizeObserver as useResizeObserverLib } from 'usehooks-ts'
import { type UseResizeObserverOptions, type UseResizeObserverReturn } from './types'

export default function useResizeObserver<
  T extends HTMLElement = HTMLElement
> (options: UseResizeObserverOptions<T>): UseResizeObserverReturn {
  return useResizeObserverLib(options)
}
