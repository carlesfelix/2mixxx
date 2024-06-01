import { type KeyboardKeyFilter } from './types'

export function matchKeyboardKeyFilter (
  event: KeyboardEvent,
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
