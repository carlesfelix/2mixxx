import { type KeyboardNavigationSettingsItem } from '../../types'

export interface UseFocusControllerOptions {
  prevNavigationSettings?: KeyboardNavigationSettingsItem
  nextNavigationSettings?: KeyboardNavigationSettingsItem
  trap?: boolean
  returnFocus?: boolean
  autoFocus?: number
}
