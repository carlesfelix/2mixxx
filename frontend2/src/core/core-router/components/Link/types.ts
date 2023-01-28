import { FocusEventHandler, MouseEventHandler, ReactNode } from 'react'

export interface LinkProps {
  className?: string
  children: ReactNode
  to: string
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
