export function getTimestamp(date: number | string | Date): number {
  return +new Date(date);
}
