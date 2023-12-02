import { Dispatch, MouseEvent, MutableRefObject, SetStateAction } from 'react'

export interface MobileMainMenuSidebarProps {
  className?: string
  closeButtonRef?: MutableRefObject<HTMLButtonElement | null>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface MobileMainMenuProps {
  className?: string
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  closeButtonRef?: MutableRefObject<HTMLButtonElement | null>
}
