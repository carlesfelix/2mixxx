export type FormatTimePrecision = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'years'
export type FormatTimeData = { [TKey in FormatTimePrecision ]: number }
