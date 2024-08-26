import Title from '@/components/atoms/Title'
import EventCardListLayout from '@/components/layout/EventCardListLayout'
import { type ReactElement } from 'react'

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
        <Title size="h2">
          Events
        </Title>
      </header>
      <EventCardListLayout className="g-layout g-layout--page-content" />
    </div>
  )
}
