import useObjectUrl from '@/core/core-hooks/useObjectUrl'
import type Async from '@/core/core-types/Async'
import http from '@/modules/http'
import { useEffect, useState } from 'react'

export default function useEventQR (
  eventId: string,
  docHeader: string
): Async<string> {
  const [qrUrl, setQrUrl] = useState<Async<string>>({
    data: '',
    inProgress: true,
    error: null
  })
  const { createObjectURL } = useObjectUrl()

  useEffect(() => {
    async function getRoomQrUrl (): Promise<string> {
      const { data } = await http.get<Blob>(
        `/rooms/${eventId}/qr`,
        {
          responseType: 'blob',
          params: { docHeader }
        }
      )
      return createObjectURL(data)
    }

    setQrUrl({
      data: '',
      inProgress: true,
      error: null
    })

    getRoomQrUrl().then(data => {
      setQrUrl({
        data,
        inProgress: false,
        error: null
      })
    }).catch(err => {
      setQrUrl({
        data: '',
        inProgress: false,
        error: err
      })
    })
  }, [eventId, setQrUrl, createObjectURL, docHeader])

  return qrUrl
}
