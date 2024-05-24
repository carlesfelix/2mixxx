import { type FocusableElement } from 'tabbable'
import { type KeyboardNavigationConfig } from '../../types'

export interface UseFocusContainerOptions {
  prevNavigationSettings?: KeyboardNavigationConfig
  nextNavigationSettings?: KeyboardNavigationConfig
  trap?: boolean
  returnFocus?: boolean | FocusableElement | null
  autoFocus?: number
}
