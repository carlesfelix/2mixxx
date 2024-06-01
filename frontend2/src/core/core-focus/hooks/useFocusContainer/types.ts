import { type KeyboardKeyFilter } from '@/core/core-keyboard'
import { type FocusableElement } from '../../services/focusable-elements'

export interface UseFocusContainerOptions {
  prevKeyboardKeyFilter: KeyboardKeyFilter
  nextKeyboardKeyFilter: KeyboardKeyFilter
  trap?: boolean
  returnFocus?: FocusableElement | null
  autoFocus?: number
}
