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
