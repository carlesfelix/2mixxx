import { KEY_CODES, matchKeyboardKeyFilter } from '@/core/core-keyboard'

export function matchDefaultNextKeyboardKeyFilter (event: KeyboardEvent): boolean {
  return matchKeyboardKeyFilter(event, { code: KEY_CODES.Tab })
}

export function matchDefaultPrevKeyboardKeyFilter (event: KeyboardEvent): boolean {
  return matchKeyboardKeyFilter(event, { code: KEY_CODES.Tab, shiftKey: true })
}

export function matchDefaultKeyboardFilter (event: KeyboardEvent): boolean {
  return (
    matchDefaultPrevKeyboardKeyFilter(event) ||
    matchDefaultNextKeyboardKeyFilter(event)
  )
}
