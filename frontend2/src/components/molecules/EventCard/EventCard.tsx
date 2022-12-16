import Card from '@/components/atoms/Card'
import { ReactComponent as CalendarTodayIcon } from '@/assets/svg/CalendarToday.svg'
import { ReactComponent as PlaceIcon } from '@/assets/svg/Place.svg'
import { ReactComponent as MoreVertIcon } from '@/assets/svg/MoreVert.svg'
import TextWithIcon from '@/components/atoms/TextWithIcon'
import './EventCard.css'
import IconButton from '@/components/atoms/IconButton'
import { ReactElement } from 'react'
import { EventCardProps } from './types'
import EventStatusPill from '../EventStatusPill'
import classNames from 'classnames'

export default function EventCard (props: EventCardProps): ReactElement {
  const {
    placeName,
    startsAt,
    status,
    title,
    className
  } = props

  const rootClassName = classNames('EventCard', className)

  return (
    <Card
      className={rootClassName}
      header={
        <div className="EventCard__header">
          <h3 className="_text _text--h3 EventCard__header-title">
            <span className="EventCard__title-ellipsis">
              <span className="EventCard__title">
                {title}
              </span>
            </span>
          </h3>
          <span className="EventCard__header-right">
            <EventStatusPill status={status} className="EventCard__header-pill" />
            <IconButton size="md" className="EventCard__header-menu" color="secondary">
              <MoreVertIcon />
            </IconButton>
          </span>
        </div>
      }
    >
      <p>
        <TextWithIcon icon={<CalendarTodayIcon />}>
          {startsAt.toLocaleDateString()}
        </TextWithIcon>
      </p>
      <p>
        <TextWithIcon icon={<PlaceIcon />}>
          {placeName}
        </TextWithIcon>
      </p>
      {/* <p>Code</p>
      <p>Assigned deejays</p> */}
    </Card>
  )
}
