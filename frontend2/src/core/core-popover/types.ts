import { Placement } from '@popperjs/core'
import { ReactNode } from 'react'

export interface PopoverProps {
  target?: Element | null
  children: ReactNode
  targetElement: HTMLElement | null
  placement?: Placement
  className?: string
  isOpen: boolean
  onChangeIsOpen: (isOpen: boolean) => void
}

export interface DefaultPopoverPortalProps {
  children: ReactNode
}

export interface PopoverContentProps {
  children: ReactNode
}
