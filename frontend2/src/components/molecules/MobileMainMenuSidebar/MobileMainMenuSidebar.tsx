import Sidebar from '@/components/atoms/Sidebar'
import classNames from 'classnames'
import MobileMainMenu from './components/MobileMainMenu'
import { MobileMainMenuSidebarProps } from './types'
import './MobileMainMenuSidebar.css'
import { ReactElement } from 'react'

export default function MobileMainMenuSidebar (
  props: MobileMainMenuSidebarProps
): ReactElement {
  const { className, onClose, isOpen, onCloseWithKeyboard, menuItemOnKeyDown } = props
  const rootClassName = classNames('MobileMainMenuSidebar', className)

  function closeWithKeyboardHandler (): void {
    onCloseWithKeyboard && onCloseWithKeyboard()
  }
  return (
    <Sidebar
      className={rootClassName}
      isOpen={isOpen}
      onClose={onClose}
      onEscape={closeWithKeyboardHandler}
    >
      <MobileMainMenu
        className="MobileMainMenuSidebar__menu"
        onClose={onClose}
        onCloseWithKeyboard={closeWithKeyboardHandler}
        menuItemOnKeyDown={menuItemOnKeyDown}
      />
    </Sidebar>
  )
}
