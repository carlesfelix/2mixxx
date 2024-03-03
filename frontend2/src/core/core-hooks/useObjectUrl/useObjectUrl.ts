import { useCallback, useEffect, useRef } from 'react'
import { type ObjectUrlItem, type UseObjectUrlReturn } from './types'

export default function useObjectUrl (): UseObjectUrlReturn {
  const objectUrls = useRef<ObjectUrlItem[]>([])
  const createObjectURL = useCallback(function (
    obj: Blob | MediaSource,
    revokeOnUnmount = true
  ): string {
    const url = URL.createObjectURL(obj)
    objectUrls.current = [
      ...objectUrls.current,
      { url, revokeOnUnmount }
    ]
    return url
  }, [objectUrls])

  const revokeObjectURL = useCallback(function (url: string): void {
    URL.revokeObjectURL(url)
    objectUrls.current = objectUrls.current.filter(
      ({ url: oldUrl }) => oldUrl !== url
    )
  }, [objectUrls])

  useEffect(() => {
    return () => {
      objectUrls.current.forEach(objectUrl => {
        objectUrl.revokeOnUnmount && revokeObjectURL(objectUrl.url)
      })
    }
  }, [objectUrls, revokeObjectURL])

  return { createObjectURL, revokeObjectURL }
}
