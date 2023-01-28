import IconButton from '@/components/atoms/IconButton'
import Popover, { PopoverInstance } from '@/core/core-popover'
import { ReactElement, useRef, useState } from 'react'
import { ReactComponent as MoreVertIcon } from '@/assets/svg/MoreVert.svg'
import './PopupMenu.css'
import { PopupMenuProps } from './types'
import classNames from 'classnames'
import MenuItems from '@/components/molecules/MenuItems'

export default function PopupMenu (props: PopupMenuProps): ReactElement {
  const { className, buttonClassName, color, size, items } = props
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const popoverRef = useRef<PopoverInstance>(null)

  function clickHandler (): void {
    popoverRef.current?.toggle()
  }

  function clickItemHandler (): void {
    popoverRef.current?.close()
  }

  const rootClassName = classNames('PopupMenu', className)

  return (
    <>
      <IconButton
        className={buttonClassName}
        color={color}
        size={size}
        ref={setTargetElement}
        onClick={clickHandler}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        placement="bottom-end"
        targetElement={targetElement}
        ref={popoverRef}
        className={rootClassName}
      >
        <MenuItems items={items} onClickItem={clickItemHandler} />
      </Popover>
    </>
  )
}
