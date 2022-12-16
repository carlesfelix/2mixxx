import EventCard from '@/components/molecules/EventCard'
import { useDate } from '@/core/core-hooks'
import EventStatusEnum from '@/enums/EventStatusEnum'
import classNames from 'classnames'
import { ReactElement } from 'react'
import './EventCardListLayout.css'
import { EventCardListLayoutProps } from './types'

export default function EventCardListLayout (
  props: EventCardListLayoutProps
): ReactElement {
  const { className } = props
  const d = useDate()

  const rootClassName = classNames('EventCardListLayout', className)

  return (
    <section className={rootClassName}>
      <EventCard
        className="EventCardListLayout__card-item"
        placeName="Las 5 hermanas"
        startsAt={d}
        status={EventStatusEnum.Ended}
        title="Comunió de Carles"
      />
      <EventCard
        className="EventCardListLayout__card-item"
        placeName="Las 5 hermanas"
        startsAt={d}
        status={EventStatusEnum.Started}
        title="Comunió de Alicia"
      />
      <EventCard
        className="EventCardListLayout__card-item"
        placeName="El Palmar"
        startsAt={d}
        status={EventStatusEnum.NotStarted}
        title="Boda de Bea"
      />
      <EventCard
        className="EventCardListLayout__card-item"
        placeName="El Palmar"
        startsAt={d}
        status={EventStatusEnum.NotStarted}
        title="Boda de Juanito"
      />
      <EventCard
        className="EventCardListLayout__card-item"
        placeName="El Palmar"
        startsAt={d}
        status={EventStatusEnum.NotStarted}
        title="Bateig de firulais"
      />
    </section>
  )
}
