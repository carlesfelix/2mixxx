import type { KeyboardEventHandler, ReactNode } from 'react'

export interface MainMenuNavLinkProps {
  icon: ReactNode
  label: string
  to: string
  onKeyDown?: KeyboardEventHandler<HTMLAnchorElement>
}
