import Sidebar from '@/components/atoms/Sidebar'
import classNames from 'classnames'
import MobileMainMenu from './components/MobileMainMenu'
import { MobileMainMenuSidebarProps, MobileMainMenuSidebarRef } from './types'
import './MobileMainMenuSidebar.css'
import { ForwardedRef, forwardRef, MouseEvent, MutableRefObject, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { usePrevious } from '@/core/core-hooks'
import { useLocation } from 'react-router-dom'

function MobileMainMenuSidebarWithRef (
  props: MobileMainMenuSidebarProps,
  ref: ForwardedRef<MobileMainMenuSidebarRef>
): ReactElement {
  const { className, keyboardFocusReturnElementRef } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { pathname } = useLocation()
  const prevPathName = usePrevious(pathname)
  const { isHighlighted } = useKeyboardAccessibility()
  const clickedElementRef = useRef<Element | null>(null)

  useImperativeHandle(ref, () => ({
    close () {
      setIsOpen(false)
    },
    open () {
      setIsOpen(true)
    },
    toggle () {
      setIsOpen(old => !old)
    }
  }), [setIsOpen])

  const returnFocus = useCallback(() => {
    if (keyboardFocusReturnElementRef) {
      keyboardFocusReturnElementRef.current?.focus()
    }
  }, [keyboardFocusReturnElementRef])

  const closeSidebar = useCallback((fromRef: MutableRefObject<Element | null>) => {
    setIsOpen(false)
    if (isHighlighted(fromRef)) {
      returnFocus()
    }
  }, [isHighlighted, returnFocus])

  useEffect(() => {
    if (prevPathName !== pathname) {
      setIsOpen(false)
      closeSidebar(clickedElementRef)
    }
  }, [pathname, prevPathName, closeSidebar, clickedElementRef])

  const rootClassName = classNames('MobileMainMenuSidebar', className)

  function sidebarClickHandler (event: MouseEvent<HTMLDivElement>): void {
    clickedElementRef.current = event.target as Element
  }

  function sidebarCloseHandler (): void {
    setIsOpen(false)
  }

  function mobileMainMenuCloseHandler (event: MouseEvent<HTMLButtonElement>): void {
    closeSidebar({ current: event.target as Element })
  }

  function sidebarEscapeHandler (): void {
    setIsOpen(false)
    returnFocus()
  }

  return (
    <Sidebar
      className={rootClassName}
      isOpen={isOpen}
      onClose={sidebarCloseHandler}
      onClick={sidebarClickHandler}
      onEscape={sidebarEscapeHandler}
    >
      <MobileMainMenu
        className="MobileMainMenuSidebar__menu"
        onClose={mobileMainMenuCloseHandler}
      />
    </Sidebar>
  )
}

const MobileMainMenuSidebar = forwardRef(MobileMainMenuSidebarWithRef)

export default MobileMainMenuSidebar
