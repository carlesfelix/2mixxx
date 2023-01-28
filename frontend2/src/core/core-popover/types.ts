import { Placement } from '@popperjs/core'
import { ReactNode } from 'react'

export interface PopoverInstance {
  open: () => void
  close: () => void
  toggle: () => void
}

export interface PopoverProps {
  target?: Element | null
  children: ReactNode
  targetElement: HTMLElement | null
  placement?: Placement
  className?: string
}

export interface DefaultPopoverPortalProps {
  children: ReactNode
}
