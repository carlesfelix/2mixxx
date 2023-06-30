import { MouseEventHandler, ReactNode } from 'react'

export type SidebarStatus = 'opening' | 'closing' | 'opened' | 'closed'
export interface SidebarProps {
  isOpen: boolean
  children: ReactNode
  className?: string
  contentClassName?: string
  onClose?: () => void
  onEscape?: () => void
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface SidebarContentProps {
  children: ReactNode
  className?: string
}
