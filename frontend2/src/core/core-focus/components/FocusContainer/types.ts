import { type DetailedHTMLProps, type HTMLAttributes } from 'react'
import { type KeyboardNavigationSettingsItem } from '../../types'

export interface FocusContainerProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'autoFocus'> {
  returnFocus?: boolean
  prevNavigationSettings?: KeyboardNavigationSettingsItem
  nextNavigationSettings?: KeyboardNavigationSettingsItem
  trap?: boolean
  autoFocus?: number
}
