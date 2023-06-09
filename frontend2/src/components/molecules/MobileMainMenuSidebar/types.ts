import { KeyboardEventHandler } from 'react'

export interface MobileMainMenuSidebarProps {
  className?: string
  onClose?: () => void
  onCloseWithKeyboard?: () => void
  menuItemOnKeyDown?: KeyboardEventHandler<HTMLElement>
  isOpen: boolean
}

export interface MobileMainMenuProps {
  className?: string
  onCloseWithKeyboard?: () => void
  onClose?: () => void
  menuItemOnKeyDown?: KeyboardEventHandler<HTMLElement>
}
