import IconButton from '@/components/atoms/IconButton'
import Popover from '@/core/core-popover'
import { type ReactElement, useRef, useState } from 'react'
import MoreVertIcon from '@/assets/svg/MoreVert.svg?react'
import { type PopupMenuProps } from './types'
import classNames from 'classnames'
import MenuItems, { type MenuItemsInstance } from '@/components/molecules/MenuItems'
import { popoverContainer } from '@/modules/popover'
import { FocusContainer } from '@/core/core-focus'
import './PopupMenu.css'

export default function PopupMenu (props: PopupMenuProps): ReactElement {
  const { className, buttonClassName, color, size, items } = props
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuItemsRef = useRef<MenuItemsInstance | null>(null)

  function clickHandler (): void {
    setIsOpen(old => !old)
  }

  function clickItemHandler (): void {
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
        onChangeIsOpen={setIsOpen}
      >
        <FocusContainer
          prevNavigationSettings={{ code: 'ArrowUp' }}
          nextNavigationSettings={{ code: 'ArrowDown' }}
          returnFocus
          trap
          autoFocus={0}
        >
          <MenuItems
            ref={menuItemsRef}
            items={items}
            onClickItem={clickItemHandler}
          />
        </FocusContainer>
      </Popover>
    </>
  )
}
