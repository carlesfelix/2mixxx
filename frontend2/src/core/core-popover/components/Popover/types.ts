import { type Strategy, type Placement } from '@floating-ui/dom'
import { type OverlayContainerProps } from '../OverlayContainer'

export interface PopoverOptions {
  placement?: Placement
  strategy?: Strategy
  fillMinWidth?: boolean
  fillWidth?: boolean
  preventCollisions?: boolean
}

export interface PopoverProps extends PopoverOptions, OverlayContainerProps {
  container: Element
  referenceElement: HTMLElement | null
  className?: string
  isOpen: boolean
  autoUpdatePosition?: boolean
  floatingElement: HTMLDivElement | null
}
