import { type DetailedHTMLProps, type HTMLAttributes } from 'react'
import { type KeyboardNavigationConfig } from '../../types'
import { type FocusableElement } from 'tabbable'

export interface FocusContainerProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'autoFocus'> {
  returnFocus?: boolean | FocusableElement | null
  prevNavigationConfig?: KeyboardNavigationConfig
  nextNavigationConfig?: KeyboardNavigationConfig
  trap?: boolean
  autoFocus?: number
}
