// import BasicButton from '@/components/atoms/BasicButton'
// import IconButton from '@/components/atoms/IconButton'
// import OutlinedButton from '@/components/atoms/OutlinedButton'
// import EventCard from '@/components/molecules/EventCard'
// import { useDate } from '@/core/core-hooks'
// import EventStatusEnum from '@/enums/EventStatusEnum'
// import useAllEvents from '@/query-hooks/useAllEvents'
import EventCardListLayout from '@/components/layout/EventCardListLayout'
import { ReactElement } from 'react'

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
      <header className="_layout _layout--page-content">
        <h2 className="_text _text--h2">
          Events
        </h2>
      </header>
      <EventCardListLayout className="_layout _layout--page-content" />
    </div>
  )
}
