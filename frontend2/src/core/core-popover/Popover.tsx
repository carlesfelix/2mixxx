import classNames from 'classnames'
import { type ReactElement, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import DefaultPopoverPortal from './components/DefaultPopoverPortal'
import './Popover.css'
import { type PopoverProps } from './types'
import { useKeyBoard } from '../core-hooks'
import PopoverContent from './components/PopoverContent'
import useClick from '../core-hooks/useClick'
import { sameWidthModifier } from './modifiers'

export default function Popover (props: PopoverProps): ReactElement {
  const {
    target,
    children,
    targetElementRef,
    placement,
    className,
    isOpen,
    sameWidth = false,
    onChangeIsOpen
  } = props
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(
    targetElementRef.current,
    popperElement,
    {
      placement,
      modifiers: [
        { ...sameWidthModifier, enabled: sameWidth }
      ]
    }
  )

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
        !targetElementRef.current?.contains(event.target as Node) &&
        !popperElement?.contains(event.target as Node)
      ) {
        onChangeIsOpen(false)
      }
    }
  })

  const rootClassName = classNames(
    'c-popover',
    className
  )

  const popperNode = (
    <div
      ref={setPopperElement}
      style={styles.popper}
      className={rootClassName}
      {...attributes.popper}
    >
      <PopoverContent>{children}</PopoverContent>
    </div>
  )

  return (
    <>
      {
        isOpen && (
          target
            ? createPortal(popperNode, target)
            : <DefaultPopoverPortal>{popperNode}</DefaultPopoverPortal>
        )
      }
    </>
  )
}
