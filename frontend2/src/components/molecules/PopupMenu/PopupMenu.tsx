import IconButton from '@/components/atoms/IconButton'
import Popover from '@/core/core-popover'
import { type ReactElement, useState, type MouseEvent } from 'react'
import MoreVertIcon from '@/assets/svg/MoreVert.svg?react'
import { type PopupMenuProps } from './types'
import classNames from 'classnames'
import MenuItems, { type MenuItem } from '@/components/molecules/MenuItems'
import { popoverContainer } from '@/modules/popover'
import { FocusContainer, useNotifyCloseEvent } from '@/core/core-focus'
import './PopupMenu.css'
import { useKeyBoard } from '@/core/core-hooks'
import useClick from '@/core/core-hooks/useClick'

export default function PopupMenu (props: PopupMenuProps): ReactElement {
  const { className, buttonClassName, color, size, items } = props
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(null)
  const notifyCloseEvent = useNotifyCloseEvent()

  // TODO: Create usePopoverHelper hook
  useKeyBoard({
    listener (event) {
      notifyCloseEvent(event)
      setIsOpen(false)
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
        notifyCloseEvent(event)
        setIsOpen(false)
      }
    }
  })

  function clickHandler (): void {
    setIsOpen(old => !old)
  }

  function clickItemHandler (item: MenuItem, event: MouseEvent): void {
    notifyCloseEvent(event)
    setIsOpen(false)
  }

  const rootClassName = classNames('c-popup-menu', className)

  return (
    <>
      <IconButton
        className={buttonClassName}
        color={color}
        size={size}
        ref={setReferenceElement}
        onClick={clickHandler}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        container={popoverContainer}
        placement="bottom-end"
        referenceElement={referenceElement}
        className={rootClassName}
        isOpen={isOpen}
        floatingElement={floatingElement}
        setFloatingElement={setFloatingElement}
      >
        <FocusContainer
          prevNavigationSettings={{ code: 'ArrowUp' }}
          nextNavigationSettings={{ code: 'ArrowDown' }}
          returnFocus
          trap
          autoFocus={0}
        >
          <MenuItems
            items={items}
            onClickItem={clickItemHandler}
          />
        </FocusContainer>
      </Popover>
    </>
  )
}
