import BasicButton from '@/components/atoms/BasicButton'
import IconButton from '@/components/atoms/IconButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import useAllEvents from '@/query-hooks/useAllEvents'

export default function RegisteredUserEventsPage () {
  const { events, removeEvent } = useAllEvents()

  function removeEventHandler (): void {
    removeEvent('e3ef7592-3ebe-409a-a4a5-7bad9869246d').then(() => {
      console.log('Removed')
    }).catch(() => {
      console.log('error')
    })
  }
  console.log(events)
  return (
    <div className="RegisteredUserEventsPage">
      <OutlinedButton size="sm" color="primary" onClick={removeEventHandler}>
        Button
      </OutlinedButton>
      <OutlinedButton size="md" color="primary">
        Button
      </OutlinedButton>
      <OutlinedButton size="lg" color="primary">
        Button
      </OutlinedButton>
      <OutlinedButton size="sm" color="secondary">
        Button
      </OutlinedButton>
      <OutlinedButton size="md" color="secondary">
        Button
      </OutlinedButton>
      <OutlinedButton size="lg" color="secondary">
        Button
      </OutlinedButton>
      <BasicButton size="sm" color="primary">
        Button
      </BasicButton>
      <BasicButton size="md" color="primary">
        Button
      </BasicButton>
      <BasicButton size="lg" color="primary">
        Button
      </BasicButton>
      <BasicButton size="sm" color="secondary">
        Button
      </BasicButton>
      <BasicButton size="md" color="secondary">
        Button
      </BasicButton>
      <BasicButton size="lg" color="secondary">
        Button
      </BasicButton>
      <IconButton size="sm" color="primary">
        X
      </IconButton>
      <IconButton size="md" color="primary">
        X
      </IconButton>
      <IconButton size="lg" color="primary">
        X
      </IconButton>
      <IconButton size="sm" color="secondary">
        X
      </IconButton>
      <IconButton size="md" color="secondary">
        X
      </IconButton>
      <IconButton size="lg" color="secondary">
        X
      </IconButton>
    </div>
  )
}
