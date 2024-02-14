import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg'
import IconButton from '@/components/atoms/IconButton'
import DesktopMainMenu from '@/components/molecules/DesktopMainMenu'
import MobileMainMenuSidebar from '@/components/molecules/MobileMainMenuSidebar'
import { FocusWithKeyboard, useAutoHighlightWithKeyboard, useHighlightReturnWithKeyboard } from '@/core/core-keyboard-accessibility'
import { ReactElement, useEffect, useRef, useState } from 'react'
import './ControlPanelLayout.css'
import { ControlPanelLayoutProps } from './types'
import { usePrevious } from '@/core/core-hooks'
import { useLocation } from 'react-router-dom'

export default function ControlPanelLayout (
  props: ControlPanelLayoutProps
): ReactElement {
  const { children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const { pathname } = useLocation()
  const prevPathName = usePrevious(pathname)
  useAutoHighlightWithKeyboard({
    isVisible: isOpen,
    ref: closeButtonRef,
    targetElementRef: openButtonRef,
    keyboardCodes: ['Enter']
  })
  useHighlightReturnWithKeyboard({
    isVisible: isOpen,
    ref: openButtonRef,
    keyboardCodes: ['Escape', 'Enter']
  })

  useEffect(() => {
    if (prevPathName !== undefined && prevPathName !== pathname) {
      setIsOpen(false)
    }
  }, [pathname, prevPathName])

  function openSidebarHandler (): void {
    setIsOpen(true)
  }

  return (
    <FocusWithKeyboard className="c-control-panel-layout" trap={false}>
      <MobileMainMenuSidebar
        className="c-control-panel-layout__mobile-menu"
        closeButtonRef={closeButtonRef}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <DesktopMainMenu className="c-control-panel-layout__desktop-menu" />
      <div className="c-control-panel-layout__main-container">
        <nav className="c-control-panel-layout__navigation-bar">
          <div className="c-control-panel-layout__navigation-bar-left-content">
            <IconButton
              size="lg"
              onClick={openSidebarHandler}
              color="primary"
              ref={openButtonRef}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </nav>
        <div className="c-control-panel-layout__page-container">
          {children}
        </div>
      </div>
    </FocusWithKeyboard>
  )
}
