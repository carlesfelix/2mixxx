import { type MouseEventHandler, type ReactNode } from 'react'

export interface MainMenuLinkItem {
  icon: ReactNode
  label: string
  to: string
}

export interface MainMenuLinksProps {
  className?: string
  linkItems: MainMenuLinkItem[]
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
