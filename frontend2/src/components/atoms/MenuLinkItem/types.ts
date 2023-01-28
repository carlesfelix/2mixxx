import { MouseEventHandler, ReactNode } from 'react'

export interface MenuLinkItemProps {
  children: ReactNode
  className?: string
  to: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
