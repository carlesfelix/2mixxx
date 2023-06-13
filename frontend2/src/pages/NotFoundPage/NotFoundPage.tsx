import BasicButton from '@/components/atoms/BasicButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import { ReactElement } from 'react'

export default function NotFoundPage (): ReactElement {
  return (
    <div className="NotFoundPage">
      NotFoundPage
      <BasicButton color="primary">Primary basic</BasicButton>
      <BasicButton color="secondary">Secondary basic</BasicButton>
      <OutlinedButton color="primary">Outlined primary</OutlinedButton>
      <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
    </div>
  )
}
