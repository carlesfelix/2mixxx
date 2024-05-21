import { type MutableRefObject } from 'react'
import { type KeydownEventStackItem } from '../../types'

export interface FocusContextValue {
  keydownEventStackRef: MutableRefObject<KeydownEventStackItem[]>
  focusFromKeyboardRef: MutableRefObject<boolean>
  focusVisibleDataKey: string
  pointerDownEventTargetRef: MutableRefObject<EventTarget | null>
}
