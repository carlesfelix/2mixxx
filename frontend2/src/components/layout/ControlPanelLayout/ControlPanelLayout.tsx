import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg'
import IconButton from '@/components/atoms/IconButton'
import DesktopMainMenu from '@/components/molecules/DesktopMainMenu'
import MobileMainMenuSidebar from '@/components/molecules/MobileMainMenuSidebar'
import { useKeyBoard, usePrevious } from '@/core/core-hooks'
import { FocusWithKeyboard, useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ControlPanelLayout.css'
import { ControlPanelLayoutProps } from './types'

export default function ControlPanelLayout (
  props: ControlPanelLayoutProps
): ReactElement {
  const { children } = props
  const btnRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const prevIsOpen = usePrevious(isOpen)
  const selectedMenuItemWithKeyboardRef = useRef<HTMLElement | null>(null)
  const { highlight } = useKeyboardAccessibility()
  const { pathname } = useLocation()
  const prevPathName = usePrevious(pathname)

  useEffect(() => {
    if (prevPathName !== undefined && pathname !== prevPathName) {
      setIsOpen(false)
    }
  }, [pathname, prevPathName, setIsOpen])

  useEffect(() => {
    if (prevIsOpen !== undefined && prevIsOpen && !isOpen && selectedMenuItemWithKeyboardRef.current) {
      btnRef.current?.focus()
      highlight(btnRef.current)
      return () => {
        selectedMenuItemWithKeyboardRef.current = null
      }
    }
  }, [prevIsOpen, isOpen, selectedMenuItemWithKeyboardRef, highlight, btnRef])

  useKeyBoard({
    listener () {
      closeWithKeyboardSidebarHandler()
    },
    code: 'Escape',
    listen: isOpen
  })

  function closeSidebarHandler (): void {
    setIsOpen(false)
  }

  function closeWithKeyboardSidebarHandler (): void {
    setIsOpen(false)
    btnRef.current?.focus()
    highlight(btnRef.current)
  }

  function menuItemOnKeyDownHandler (event: KeyboardEvent<HTMLElement>): void {
    selectedMenuItemWithKeyboardRef.current = event.currentTarget
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
        onCloseWithKeyboard={closeWithKeyboardSidebarHandler}
        menuItemOnKeyDown={menuItemOnKeyDownHandler}
      />
      <FocusWithKeyboard trap={false}>
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
    </div>
  )
}
