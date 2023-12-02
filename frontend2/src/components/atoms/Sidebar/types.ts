import { Dispatch, ReactNode, SetStateAction } from 'react'

export type SidebarStatus = 'opening' | 'closing' | 'opened' | 'closed'
export interface SidebarProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface SidebarContentProps {
  children: ReactNode
  className?: string
}
