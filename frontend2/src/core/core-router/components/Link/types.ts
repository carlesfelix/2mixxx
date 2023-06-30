import { MouseEventHandler, ReactNode } from 'react'

export interface LinkProps {
  className?: string
  children: ReactNode
  to: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
