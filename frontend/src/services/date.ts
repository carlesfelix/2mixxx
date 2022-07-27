export function getHumanizedDateDiff(
  from: Date | number | string,
  to: Date | number | string
): {
  value: number,
  format: 'hours' | 'minutes' | 'seconds' | 'milliseconds'
} {
  const dFrom = new Date(from);
  const dTo = new Date(to);
  const diff = +dTo - +dFrom;
  const milliseconds = diff;
  if (milliseconds < 1000) {
    return {
      format: 'milliseconds',
      value: milliseconds
    };
  }
  const seconds = Math.round(diff / 1000);
  if (seconds < 60) {
    return {
      format: 'seconds',
      value: seconds
    };
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return {
      format: 'minutes',
      value: minutes
    };
  }
  const hours = Math.round(minutes / 60);
  return {
    format: 'hours',
    value: hours
  };
}

export function isDate(d: Date | number | string | null): boolean {
  return d !== null && !isNaN(+(new Date(d)))
}
