import IconButton from '@/components/atoms/IconButton'
import Popover from '@/core/core-popover'
import { ReactElement, useRef, useState } from 'react'
import { ReactComponent as MoreVertIcon } from '@/assets/svg/MoreVert.svg'
import './PopupMenu.css'
import { PopupMenuProps } from './types'
import classNames from 'classnames'
import MenuItems, { MenuItemsInstance } from '@/components/molecules/MenuItems'
import { useAutoHighlightWithKeyboard, useHighlightReturnWithKeyboard } from '@/core/core-keyboard-accessibility'

export default function PopupMenu (props: PopupMenuProps): ReactElement {
  const { className, buttonClassName, color, size, items } = props
  const targetElementRef = useRef<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuItemsRef = useRef<MenuItemsInstance | null>(null)
  useAutoHighlightWithKeyboard({
    isVisible: isOpen,
    ref: menuItemsRef,
    targetElementRef,
    keyboardCodes: ['Enter']
  })
  useHighlightReturnWithKeyboard({
    isVisible: isOpen,
    ref: targetElementRef,
    keyboardCodes: ['Escape', 'Enter']
  })

  function clickHandler (): void {
    setIsOpen(old => !old)
  }

  function clickItemHandler (): void {
    setIsOpen(false)
  }

  const rootClassName = classNames('PopupMenu', className)

  return (
    <>
      <IconButton
        className={buttonClassName}
        color={color}
        size={size}
        ref={targetElementRef}
        onClick={clickHandler}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        placement="bottom-end"
        targetElement={targetElementRef.current}
        className={rootClassName}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      >
        <MenuItems
          ref={menuItemsRef}
          items={items}
          onClickItem={clickItemHandler}
        />
      </Popover>
    </>
  )
}
