import { type ReactNode } from 'react'
import { type TrapLimit } from '../../types'
import { type FocusableElement } from 'tabbable'

export interface FocusProviderProps {
  children?: ReactNode
}

export interface GetNextFocusableElementParams {
  focusableElements: FocusableElement[]
  lastFocusEventTarget: EventTarget | null
  trapLimit?: TrapLimit
  direction: -1 | 1
}
