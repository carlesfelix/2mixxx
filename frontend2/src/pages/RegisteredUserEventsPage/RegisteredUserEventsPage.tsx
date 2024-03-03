import EventCardListLayout from '@/components/layout/EventCardListLayout'
import { type MenuItem } from '@/components/molecules/MenuItems'
import PopupMenu from '@/components/molecules/PopupMenu'
import { type ReactElement } from 'react'

const items: MenuItem[] = [
  {
    type: 'link',
    label: 'Link 1',
    to: '/events/create'
  },
  {
    type: 'link',
    label: 'Link 2',
    to: '/events/create'
  },
  {
    type: 'button',
    label: 'Button 1',
    icon: <span>X</span>
  },
  {
    type: 'link',
    label: 'Link 3',
    to: '/events/create'
  }
]

export default function RegisteredUserEventsPage (): ReactElement {
  // const { events, removeEvent } = useAllEvents()

  // function removeEventHandler (): void {
  //   removeEvent('e3ef7592-3ebe-409a-a4a5-7bad9869246d').then(() => {
  //     console.log('Removed')
  //   }).catch(() => {
  //     console.log('error')
  //   })
  // }
  // console.log(events)
  return (
    <div className="RegisteredUserEventsPage">
      <header className="g-layout g-layout--page-content">
        <h2 className="g-text g-text--h2">
          Events
        </h2>
      </header>
      <PopupMenu items={items} />
      <EventCardListLayout className="g-layout g-layout--page-content" />
    </div>
  )
}
