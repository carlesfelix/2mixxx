import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg'
import IconButton from '@/components/atoms/IconButton'
import DesktopMainMenu from '@/components/molecules/DesktopMainMenu'
import MobileMainMenuSidebar from '@/components/molecules/MobileMainMenuSidebar'
import { useListenKeyboard } from '@/core/core-listen-keyboard'
import { ReactElement, useEffect, useState } from 'react'
import './ControlPanelLayout.css'
import { ControlPanelLayoutProps } from './types'

export default function ControlPanelLayout (
  props: ControlPanelLayoutProps
): ReactElement {
  const { children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { onKeydown } = useListenKeyboard()

  useEffect(() => {
    const unlisten = onKeydown({
      code: 'Escape',
      callback: () => {
        setIsOpen(false)
      }
    })
    return () => {
      unlisten()
    }
  }, [onKeydown, setIsOpen])

  function closeSidebarHandler (): void {
    setIsOpen(false)
  }

  function openSidebarHandler (): void {
    setIsOpen(true)
  }

  return (
    <div className="ControlPanelLayout">
      <MobileMainMenuSidebar
        className="ControlPanelLayout__mobile-menu"
        isOpen={isOpen}
        onClose={closeSidebarHandler}
      />
      <DesktopMainMenu className="ControlPanelLayout__desktop-menu" />
      <div className="ControlPanelLayout__main-container">
        <nav className="ControlPanelLayout__navigation-bar">
          <div className="ControlPanelLayout__navigation-bar-left-content">
            <IconButton
              size="lg"
              onClick={openSidebarHandler}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          </div>

        </nav>
        <div className="ControlPanelLayout__page-container">
          {children}
        </div>
      </div>
    </div>
  )
}
