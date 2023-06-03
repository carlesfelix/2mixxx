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
import { useListenKeyboard } from '@/core/core-listen-keyboard'
import DefaultPopoverPortal from './components/DefaultPopoverPortal'
import './Popover.css'
import { PopoverInstance, PopoverProps } from './types'

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

  const [open, setOpen] = useState<boolean>(false)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(
    targetElement,
    popperElement,
    {
      placement
    }
  )

  const { onKeydown } = useListenKeyboard()

  useEffect(() => {
    if (open) {
      const unlisten = onKeydown({
        code: 'Escape',
        callback: () => {
          setOpen(false)
        }
      })
      return () => {
        unlisten()
      }
    }
  }, [onKeydown, setOpen, popperElement, open])

  useImperativeHandle(ref, () => ({
    close () {
      setOpen(false)
    },
    open () {
      setOpen(true)
    },
    toggle () {
      setOpen(old => !old)
    }
  }), [setOpen])

  useEffect(() => {
    function globalClickHandler (event: MouseEvent): void {
      if (
        !targetElement?.contains(event.target as Node) &&
        !popperElement?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('click', globalClickHandler)
    return () => {
      window.removeEventListener('click', globalClickHandler)
    }
  }, [targetElement, popperElement, setOpen])

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
      {children}
    </div>
  )

  return (
    <>
      {
        open && (
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
