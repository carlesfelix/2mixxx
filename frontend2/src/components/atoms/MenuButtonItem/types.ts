import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react'

export interface MenuButtonItemProps {
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  onFocus?: FocusEventHandler<HTMLButtonElement>
  onBlur?: FocusEventHandler<HTMLButtonElement>
}
