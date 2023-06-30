import { MouseEvent, RefObject } from 'react'

export interface MobileMainMenuSidebarProps {
  className?: string
  keyboardFocusReturnElementRef?: RefObject<HTMLElement>
}

export interface MobileMainMenuSidebarRef {
  close: () => void
  open: () => void
  toggle: () => void
}

export interface MobileMainMenuProps {
  className?: string
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}
