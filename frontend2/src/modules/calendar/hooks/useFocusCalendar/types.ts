import { type View } from 'react-calendar/dist/cjs/shared/types'

export interface CalendarFocusConfig {
  headerItems: number
  columns: number
  viewItems: number
}

export interface UseFocusCalendarProps {
  container: HTMLDivElement | null
  activeStartDate: Date
  view: View
  onActiveStartDateChange: (date: Date) => void
}
