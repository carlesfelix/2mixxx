import { ReactNode } from 'react'

export type SidebarStatus = 'opening' | 'closing' | 'opened' | 'closed'
export interface SidebarProps {
  isOpen: boolean
  children: ReactNode
  className?: string
  contentClassName?: string
  onClose?: () => void
}

export interface SidebarContentProps {
  children: ReactNode
  className?: string
}
