import { FocusEvent, ReactNode } from 'react'

export interface PointerElementProviderProps {
  children: ReactNode
}

export interface UseFocusHighlightReturn {
  focus: (event: FocusEvent) => void
  blur: () => void
  isHighlighted: boolean
}
