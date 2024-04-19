import { type Placement } from '@popperjs/core'
import { type MutableRefObject, type ReactNode } from 'react'

export interface PopoverProps {
  target?: Element | null
  children: ReactNode
  targetElementRef: MutableRefObject<HTMLElement | null>
  placement?: Placement
  className?: string
  isOpen: boolean
  onChangeIsOpen: (isOpen: boolean) => void
  sameWidth?: boolean
}

export interface DefaultPopoverPortalProps {
  children: ReactNode
}

export interface PopoverContentProps {
  children: ReactNode
}
