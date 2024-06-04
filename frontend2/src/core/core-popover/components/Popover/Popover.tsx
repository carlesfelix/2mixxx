import { type ReactElement, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { autoUpdate as onAutoUpdate } from '@floating-ui/dom'
import { type PopoverProps } from './types'
import { updatePosition } from './utils'
import OverlayContainer from '../OverlayContainer'

export default function Popover (props: PopoverProps): ReactElement {
  const {
    container,
    referenceElement,
    placement,
    isOpen,
    fillMinWidth = false,
    fillWidth,
    autoUpdatePosition: autoUpdate = true,
    preventCollisions = true,
    floatingElement,
    strategy,
    ...overlayContainerProps
  } = props

  useEffect(() => {
    if (autoUpdate && referenceElement && floatingElement) {
      const cleanup = onAutoUpdate(referenceElement, floatingElement, () => {
        updatePosition(referenceElement, floatingElement, {
          preventCollisions,
          placement,
          fillMinWidth,
          fillWidth,
          strategy
        })
      }, { layoutShift: false })
      return () => {
        cleanup()
      }
    }
  }, [
    autoUpdate,
    referenceElement,
    floatingElement,
    placement,
    fillMinWidth,
    fillWidth,
    preventCollisions,
    strategy
  ])

  return createPortal(isOpen && (
    <OverlayContainer {...overlayContainerProps} />
  ), container)
}
