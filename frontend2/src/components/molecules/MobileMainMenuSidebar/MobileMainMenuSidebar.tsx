import Sidebar from '@/components/atoms/Sidebar'
import classNames from 'classnames'
import MobileMainMenu from './components/MobileMainMenu'
import { type MobileMainMenuSidebarProps } from './types'
import './MobileMainMenuSidebar.css'
import { type MouseEvent, type ReactElement } from 'react'
import { useNotifyCloseEvent } from '@/core/core-focus'

export default function MobileMainMenuSidebar (
  props: MobileMainMenuSidebarProps
): ReactElement {
  const { className, isOpen, setIsOpen, closeButtonRef, onClick } = props
  const rootClassName = classNames('c-mobile-main-menu-sidebar', className)
  const notifyCloseEvent = useNotifyCloseEvent()

  function closeHandler (event: MouseEvent): void {
    notifyCloseEvent(event)
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
        onClickMenuLink={onClick}
      />
    </Sidebar>
  )
}
