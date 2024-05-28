import { type FocusableElement } from 'tabbable'
import { type KeyboardNavigationConfig } from '../../types'

export interface UseFocusContainerOptions {
  prevNavigationConfig: KeyboardNavigationConfig
  nextNavigationConfig: KeyboardNavigationConfig
  trap?: boolean
  returnFocus?: boolean | FocusableElement | null
  autoFocus?: number
  columns?: boolean
}
