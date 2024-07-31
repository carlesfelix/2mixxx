import { type View } from 'react-calendar/dist/cjs/shared/types'
import { type CalendarFocusConfig } from './types'
import { getDaysOfMonth } from '@/core/core-date'

export function getCalendarFocusConfig (date: Date, view: View): CalendarFocusConfig {
  if (view === 'month') {
    return {
      headerItems: 5,
      columns: 7,
      viewItems: getDaysOfMonth(date)
    }
  }
  if (view === 'year') {
    return {
      headerItems: 5,
      columns: 3,
      viewItems: 12
    }
  }
  if (view === 'decade') {
    return {
      headerItems: 5,
      columns: 3,
      viewItems: 10
    }
  }
  return {
    headerItems: 2,
    columns: 3,
    viewItems: 10
  }
}
