import { type MutableRefObject } from 'react'
import { type KeydownEventStackItem } from '../../types'

export interface FocusContextValue {
  keydownEventStackRef: MutableRefObject<KeydownEventStackItem[]>
}
