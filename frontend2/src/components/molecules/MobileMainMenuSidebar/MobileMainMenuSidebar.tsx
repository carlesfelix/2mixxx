import Sidebar from '@/components/atoms/Sidebar'
import classNames from 'classnames'
import MobileMainMenu from './components/MobileMainMenu'
import { type MobileMainMenuSidebarProps } from './types'
import { type MouseEvent, type ReactElement } from 'react'
import './MobileMainMenuSidebar.css'

export default function MobileMainMenuSidebar (
  props: MobileMainMenuSidebarProps
): ReactElement {
  const { className, isOpen, setIsOpen, closeButtonRef } = props
  const rootClassName = classNames('c-mobile-main-menu-sidebar', className)

  function closeHandler (event: MouseEvent): void {
    setIsOpen(false)
  }

  return (
    <Sidebar
      className={rootClassName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <MobileMainMenu
        className="c-mobile-main-menu-sidebar__menu"
        onClose={closeHandler}
        closeButtonRef={closeButtonRef}
      />
    </Sidebar>
  )
}
