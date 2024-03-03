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

export default function Popover (props: PopoverProps): ReactElement {
  const {
    target,
    children,
    targetElement,
    placement,
    className,
    isOpen,
    onChangeIsOpen
  } = props
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(
    targetElement,
    popperElement,
    {
      placement
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
        !targetElement?.contains(event.target as Node) &&
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
