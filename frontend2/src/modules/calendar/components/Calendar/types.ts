import { type Value } from 'react-calendar/dist/cjs/shared/types'

export type CalendarValue = Value
export interface CalendarProps {
  className?: string
  initialActiveStartDate?: Date
  value: CalendarValue
  onChange: (value: CalendarValue) => void
}
