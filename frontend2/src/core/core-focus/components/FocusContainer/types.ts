import { type DetailedHTMLProps, type HTMLAttributes } from 'react'
import { type FocusableElement } from '../../services/focusable-elements'
import { type KeyboardKeyFilter } from '@/core/core-keyboard'

export interface FocusContainerProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'autoFocus'> {
  returnFocus?: boolean | FocusableElement | null
  prevKeyboardKeyFilter?: KeyboardKeyFilter
  nextKeyboardKeyFilter?: KeyboardKeyFilter
  trap?: boolean
  autoFocus?: number
}
