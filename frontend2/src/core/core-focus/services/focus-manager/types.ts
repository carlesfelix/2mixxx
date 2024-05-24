import { type FocusNavigationAction } from '../../types'

export interface FocusManagerReturn {
  listen: () => void
  unlisten: () => void
  onKeyDown: (focusNavigationAction: FocusNavigationAction) => void
}
