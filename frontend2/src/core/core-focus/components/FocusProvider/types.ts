import { type ReactNode } from 'react'
import { type TrapLimit } from '../../types'
import { type FocusableElement } from 'tabbable'

export interface FocusProviderProps {
  children?: ReactNode
  focusVisibleDataKey: string
}

export interface GetNextFocusableElementParams {
  focusableElements: FocusableElement[]
  trapLimit?: TrapLimit
  direction: -1 | 1
}
