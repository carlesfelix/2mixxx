import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg'
import IconButton from '@/components/atoms/IconButton'
import DesktopMainMenu from '@/components/molecules/DesktopMainMenu'
import MobileMainMenuSidebar, { MobileMainMenuSidebarRef } from '@/components/molecules/MobileMainMenuSidebar'
import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'
import { ReactElement, useRef } from 'react'
import './ControlPanelLayout.css'
import { ControlPanelLayoutProps } from './types'

export default function ControlPanelLayout (
  props: ControlPanelLayoutProps
): ReactElement {
  const { children } = props
  const btnRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<MobileMainMenuSidebarRef | null>(null)

  function openSidebarHandler (): void {
    sidebarRef.current?.open()
  }

  return (
    <FocusWithKeyboard className="ControlPanelLayout" trap={false}>
      <MobileMainMenuSidebar
        className="ControlPanelLayout__mobile-menu"
        keyboardFocusReturnElementRef={btnRef}
        ref={sidebarRef}
      />
      <DesktopMainMenu className="ControlPanelLayout__desktop-menu" />
      <div className="ControlPanelLayout__main-container">
        <nav className="ControlPanelLayout__navigation-bar">
          <div className="ControlPanelLayout__navigation-bar-left-content">
            <IconButton
              size="lg"
              onClick={openSidebarHandler}
              color="primary"
              ref={btnRef}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </nav>
        <div className="ControlPanelLayout__page-container">
          {children}
        </div>
      </div>
    </FocusWithKeyboard>
  )
}
