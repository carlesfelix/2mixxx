import { MouseEventHandler, ReactNode } from 'react'

export interface MenuButtonItemProps {
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}
