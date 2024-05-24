import { type FocusManagerReturn } from '../../services/focus-manager'

export type UseFocusManagerReturn = Omit<FocusManagerReturn, 'listen' | 'unlisten'>
