import { type FormatTimeData, type FormatTimePrecision } from '../../types'

export function getDaysOfMonth (date: Date): number {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month + 1, 0).getDate()
}

export function startDay (date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getFormatTime (
  milliseconds: number,
  precisions: FormatTimePrecision[]
): FormatTimeData {
  let millisecondsRemaining = milliseconds
  const result: FormatTimeData = {
    days: 0,
    hours: 0,
    milliseconds: 0,
    minutes: 0,
    seconds: 0,
    years: 0
  }
  if (precisions.includes('days')) {
    const days = Math.floor(millisecondsRemaining / (24 * 60 * 60 * 1000))
    millisecondsRemaining -= days * (24 * 60 * 60 * 1000)
    result.days = days
  }
  if (precisions.includes('hours')) {
    const hours = Math.floor(millisecondsRemaining / (60 * 60 * 1000))
    result.hours = hours
    millisecondsRemaining -= hours * (60 * 60 * 1000)
  }
  if (precisions.includes('minutes')) {
    const minutes = Math.floor(millisecondsRemaining / (60 * 1000))
    result.minutes = minutes
    millisecondsRemaining -= minutes * (60 * 1000)
  }
  if (precisions.includes('seconds')) {
    const seconds = Math.floor(millisecondsRemaining / 1000)
    result.seconds = seconds
    millisecondsRemaining -= seconds * 1000
  }
  return result
}

export function getMillisecondsFromFormatTime (formatTimeData: FormatTimeData): number {
  let totalMilliseconds = 0
  totalMilliseconds += formatTimeData.days * 24 * 60 * 60 * 1000
  totalMilliseconds += formatTimeData.hours * 60 * 60 * 1000
  totalMilliseconds += formatTimeData.minutes * 60 * 1000
  totalMilliseconds += formatTimeData.seconds * 1000
  totalMilliseconds += formatTimeData.milliseconds
  return totalMilliseconds
}
