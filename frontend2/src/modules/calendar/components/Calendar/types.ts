import { type View, type Value } from 'react-calendar/dist/cjs/shared/types'

export type CalendarValue = Value
export interface CalendarProps {
  className?: string
  initialActiveStartDate?: Date
  value: CalendarValue
  onChange: (value: CalendarValue) => void
  range?: boolean
  min?: Date
  max?: Date
}

export interface TileIsDisabledOptions {
  date: Date
  view: View
  min?: Date
  max?: Date
}
