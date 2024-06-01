import { type FocusableElement } from '@/core/core-focus'
import { type Dispatch, type MouseEvent, type SetStateAction } from 'react'

export interface MobileMainMenuSidebarProps {
  className?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  returnFocus?: FocusableElement | null
}

export interface MobileMainMenuProps {
  className?: string
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}
