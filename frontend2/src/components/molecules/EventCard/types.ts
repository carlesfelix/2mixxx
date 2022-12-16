import EventStatusEnum from '@/enums/EventStatusEnum'

export interface EventCardProps {
  title: string
  status: EventStatusEnum
  startsAt: Date
  placeName: string
  className?: string
}
