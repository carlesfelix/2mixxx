import { type KeyboardKeyFilter } from './types'

export function matchKeyboardKeyFilter (
  event: KeyboardEvent | React.KeyboardEvent,
  keyboardKeyFilter: KeyboardKeyFilter
): boolean {
  const {
    code,
    altKey = false,
    ctrlKey = false,
    metaKey = false,
    shiftKey = false
  } = keyboardKeyFilter
  return event.code === code &&
    event.altKey === altKey &&
    event.ctrlKey === ctrlKey &&
    event.metaKey === metaKey &&
    event.shiftKey === shiftKey
}

export function matchSomeKeyboardKeyFilter (
  event: KeyboardEvent | React.KeyboardEvent,
  keyboardKeyFilters: KeyboardKeyFilter[]
): boolean {
  return keyboardKeyFilters.some(keyboardKeyFilter => matchKeyboardKeyFilter(event, keyboardKeyFilter))
}
