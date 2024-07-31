export function getDaysOfMonth (date: Date): number {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month + 1, 0).getDate()
}
