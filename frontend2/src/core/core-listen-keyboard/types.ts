import { KeyboardListener, UnlistenKeyboard } from '@/core/core-hooks'
import { ReactNode } from 'react'

export interface ListenKeyboardContextReturn {
  onKeydown: (listener: KeyboardListener) => UnlistenKeyboard
  onKeyup: (listener: KeyboardListener) => UnlistenKeyboard
}

export interface ListenKeyboardProviderProps {
  children: ReactNode
}
