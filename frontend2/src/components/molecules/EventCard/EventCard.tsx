import Card from '@/components/atoms/Card'
import CalendarTodayIcon from '@/assets/svg/CalendarToday.svg?react'
import PlaceIcon from '@/assets/svg/Place.svg?react'
import TextWithIcon from '@/components/atoms/TextWithIcon'
import './EventCard.css'
import { type ReactElement } from 'react'
import { type EventCardProps } from './types'
import EventStatusPill from '../EventStatusPill'
import classNames from 'classnames'
import PopupMenu from '@/components/molecules/PopupMenu'
import { type MenuItem } from '@/components/molecules/MenuItems'
import Title from '@/components/atoms/Title'
import Text from '@/components/atoms/Text'

const items: MenuItem[] = [
  {
    type: 'button',
    label: 'Update',
    icon: <span>X</span>,
    onClick: (event) => {
      console.log('onClick', event)
    }
  },
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
          <Title size='h4' className="c-event-card__header-title">
            <span className="c-event-card__title-ellipsis">
              <span className="c-event-card__title">
                {title}
              </span>
            </span>
          </Title>
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
      <Text as="p" className="c-event-card__description-text">
        <TextWithIcon icon={<CalendarTodayIcon />}>
          {startsAt.toLocaleDateString()}
        </TextWithIcon>
      </Text>
      <Text as="p" className="c-event-card__description-text">
        <TextWithIcon icon={<PlaceIcon />}>
          {placeName}
        </TextWithIcon>
      </Text>
    </Card>
  )
}
