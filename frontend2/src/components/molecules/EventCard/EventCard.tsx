import Card from '@/components/atoms/Card'
import { ReactComponent as CalendarTodayIcon } from '@/assets/svg/CalendarToday.svg'
import { ReactComponent as PlaceIcon } from '@/assets/svg/Place.svg'
import TextWithIcon from '@/components/atoms/TextWithIcon'
import './EventCard.css'
import { ReactElement } from 'react'
import { EventCardProps } from './types'
import EventStatusPill from '../EventStatusPill'
import classNames from 'classnames'
import PopupMenu from '@/components/molecules/PopupMenu'
import { MenuItem } from '@/components/molecules/MenuItems'

const items: MenuItem[] = [
  {
    type: 'link',
    label: 'Details',
    to: '/events/create'
  },
  {
    type: 'link',
    label: 'Assign/Un-assign Deejays',
    to: '/events/create'
  },
  {
    type: 'link',
    label: 'Edit',
    to: '/events/create'
  },
  {
    type: 'button',
    label: 'Change Status'
  },
  {
    type: 'button',
    label: 'Delete',
    icon: <span>X</span>,
    onClick: (event) => {
      console.log('onClick', event)
    }
  }
]

export default function EventCard (props: EventCardProps): ReactElement {
  const {
    placeName,
    startsAt,
    status,
    title,
    className
  } = props

  const rootClassName = classNames('c-event-card', className)

  return (
    <Card
      className={rootClassName}
      header={
        <div className="c-event-card__header">
          <h3 className="g-text g-text--h3 c-event-card__header-title">
            <span className="c-event-card__title-ellipsis">
              <span className="c-event-card__title">
                {title}
              </span>
            </span>
          </h3>
          <span className="c-event-card__header-right">
            <EventStatusPill status={status} className="c-event-card__header-pill" />
            <PopupMenu
              className="c-event-card__header-menu"
              color="secondary"
              size="sm"
              items={items}
            />
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
