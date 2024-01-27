import { useQuery } from '@/core/core-query'
import { EventEntity } from '@/query-hooks/useAllEvents/types'
import http from '@/modules/http'
import { useCallback } from 'react'
import { UseAllEventsReturn } from './types'

export default function useAllEventsApiRest (): UseAllEventsReturn {
  const { state, mutate } = useQuery<EventEntity[]>('/rooms', {
    defaultData: []
  })

  const removeEvent = useCallback(async (eventId: string) => {
    await mutate(async currentData => {
      await http.delete(`/rooms/${eventId}`)
      return currentData?.filter(eachEvent => eachEvent.id !== eventId)
    })
  }, [mutate])

  return {
    events: state,
    removeEvent
  }
}
