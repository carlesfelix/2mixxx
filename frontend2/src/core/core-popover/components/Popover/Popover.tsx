import classNames from 'classnames'
import { type ReactElement, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { autoUpdate as onAutoUpdate } from '@floating-ui/dom'
import { type PopoverProps } from './types'
import { updatePosition } from './utils'
import './Popover.css'

export default function Popover (props: PopoverProps): ReactElement {
  const {
    container,
    children,
    referenceElement,
    placement,
    className,
    isOpen,
    fillMinWidth = false,
    fillWidth,
    autoUpdate = true,
    touchUI = false,
    preventCollisions = true,
    floatingElement,
    setFloatingElement,
    strategy
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

  const rootClassName = classNames(
    'c-popover',
    { 'c-popover--touch-ui': touchUI },
    className
  )

  const popperNode = (
    <div
      ref={setFloatingElement}
      className={rootClassName}
    >
      {children}
    </div>
  )

  return createPortal(isOpen && popperNode, container)
}
