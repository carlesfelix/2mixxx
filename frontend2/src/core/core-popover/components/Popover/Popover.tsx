import { type ReactElement, useLayoutEffect } from 'react'
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

  useLayoutEffect(() => {
    if (referenceElement && floatingElement) {
      updatePosition(referenceElement, floatingElement, {
        preventCollisions,
        placement,
        fillMinWidth,
        fillWidth,
        strategy
      })
    }
  }, [
    referenceElement,
    floatingElement,
    placement,
    fillMinWidth,
    fillWidth,
    preventCollisions,
    strategy
  ])

  useLayoutEffect(() => {
    if (autoUpdate && referenceElement && floatingElement) {
      // When the floating element is open on the screen
      const cleanup = onAutoUpdate(referenceElement, floatingElement, () => {
        updatePosition(referenceElement, floatingElement, {
          preventCollisions,
          placement,
          fillMinWidth,
          fillWidth,
          strategy
        })
      })
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
