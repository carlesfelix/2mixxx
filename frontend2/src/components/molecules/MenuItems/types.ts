import { MouseEvent, MouseEventHandler, ReactNode } from 'react'

export interface BaseMenuItem {
  type: string
  label: string
  icon?: ReactNode
}

export interface ButtonMenuItem extends BaseMenuItem {
  type: 'button'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface LinkMenuItem extends BaseMenuItem {
  type: 'link'
  to: string
}

export type MenuItem = ButtonMenuItem | LinkMenuItem

export interface MenuItemsProps {
  items: MenuItem[]
  onClickItem: (item: MenuItem, event: MouseEvent<HTMLElement>) => void
  focusIndex?: number
}

export interface MenuItemsInstance {
  focus: () => void
}
