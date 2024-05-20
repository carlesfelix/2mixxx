import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

export interface MainMenuNavLinkProps {
  icon: ReactNode
  label: string
  to: string
  onKeyDown?: KeyboardEventHandler<HTMLAnchorElement>
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
