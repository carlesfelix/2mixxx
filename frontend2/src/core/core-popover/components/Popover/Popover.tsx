import classNames from 'classnames'
import { type ReactElement, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { autoUpdate as onAutoUpdate } from '@floating-ui/dom'
import { type PopoverProps } from './types'
import { useKeyBoard } from '../../../core-hooks'
import useClick from '../../../core-hooks/useClick'
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
    onChangeIsOpen,
    autoUpdate = true,
    touchUI = false,
    preventCollisions = true,
    strategy
  } = props
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(null)

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

  useKeyBoard({
    listener () {
      onChangeIsOpen(false)
    },
    code: 'Escape',
    listen: isOpen
  })

  useClick({
    listener (event) {
      if (
        !referenceElement?.contains(event.target as Node) &&
        !floatingElement?.contains(event.target as Node)
      ) {
        onChangeIsOpen(false)
      }
    }
  })

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
