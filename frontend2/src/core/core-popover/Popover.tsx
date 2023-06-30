import classNames from 'classnames'
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import DefaultPopoverPortal from './components/DefaultPopoverPortal'
import './Popover.css'
import { PopoverInstance, PopoverProps } from './types'
import { useKeyBoard } from '../core-hooks'
import PopoverContent from './components/PopoverContent'

function PopoverWithRef (
  props: PopoverProps,
  ref: ForwardedRef<PopoverInstance>
): ReactElement {
  const {
    target,
    children,
    targetElement,
    placement,
    className
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
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
      setIsOpen(false)
    },
    code: 'Escape',
    listen: isOpen
  })

  useImperativeHandle(ref, () => ({
    close () {
      setIsOpen(false)
    },
    open () {
      setIsOpen(true)
    },
    toggle () {
      setIsOpen(old => !old)
    }
  }), [setIsOpen])

  useEffect(() => {
    function globalClickHandler (event: MouseEvent): void {
      if (
        !targetElement?.contains(event.target as Node) &&
        !popperElement?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', globalClickHandler)
    return () => {
      window.removeEventListener('click', globalClickHandler)
    }
  }, [targetElement, popperElement, setIsOpen])

  const rootClassName = classNames(
    'Popover',
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

const Popover = forwardRef(PopoverWithRef)

export default Popover
