import { type TileIsDisabledOptions } from './types'

export function tileIsDisabled (props: TileIsDisabledOptions): boolean {
  const { date, view, min, max } = props
  const month = date.getMonth()
  const year = date.getFullYear()
  if (view === 'month' && min && min.getTime() > date.getTime()) {
    return true
  }
  if (view === 'month' && max && max.getTime() < date.getTime()) {
    return true
  }
  if (view === 'year' && min && min.getTime() > date.getTime() && (min.getMonth() > month || min.getFullYear() > year)) {
    return true
  }
  if (view === 'year' && max && max.getTime() < date.getTime() && (max.getMonth() < month || max.getFullYear() < year)) {
    return true
  }
  if (view === 'decade' && min && min.getFullYear() > year) {
    return true
  }
  if (view === 'decade' && max && max.getFullYear() < year) {
    return true
  }
  if (view === 'century' && min && min.getFullYear() > (year - (year % 10) + 10)) {
    return true
  }
  if (view === 'century' && max && max.getFullYear() < (year - (year % 10) + 1)) {
    return true
  }
  return false
}
