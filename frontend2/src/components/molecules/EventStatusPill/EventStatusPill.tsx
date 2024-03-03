import Pill, { type PillColor } from '@/components/atoms/Pill'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import type EventStatusPillProps from './types'

const statusLabels = ['Not started', 'Started', 'Ended']
const statusColors: PillColor[] = ['warning', 'success', 'danger']

export default function EventStatusPill (
  props: EventStatusPillProps
): ReactElement {
  const { status, className } = props

  const rootClassName = classNames(
    'c-event-status-pill',
    className
  )

  return (
    <Pill color={statusColors[status]} className={rootClassName}>
      {statusLabels[status]}
    </Pill>
  )
}
