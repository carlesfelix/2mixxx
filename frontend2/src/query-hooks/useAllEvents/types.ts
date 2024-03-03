import type Async from '@/core/core-types/Async'
import type BaseEntity from '@/types/BaseEntity'

export type EventEntity = {
  code: string
  allowSongRequests: boolean
  canModerate: boolean
} & BaseEntity

export interface UseAllEventsReturn {
  events: Async<EventEntity[]>
  removeEvent: (eventId: string) => Promise<void>
}
