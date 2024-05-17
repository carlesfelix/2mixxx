import { type Strategy, type Placement } from '@floating-ui/dom'
import { type ReactNode } from 'react'

export interface PopoverOptions {
  placement?: Placement
  strategy?: Strategy
  fillMinWidth?: boolean
  fillWidth?: boolean
  preventCollisions?: boolean
}

export interface PopoverProps extends PopoverOptions {
  container: Element
  children: ReactNode
  referenceElement: HTMLElement | null
  className?: string
  isOpen: boolean
  onChangeIsOpen: (isOpen: boolean) => void
  autoUpdate?: boolean
  touchUI?: boolean
}
