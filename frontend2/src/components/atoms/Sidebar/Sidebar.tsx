import classNames from 'classnames'
import {
  type AnimationEvent,
  type ReactElement,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { type SidebarProps, type SidebarStatus } from './types'
import { popoverContainer } from '@/modules/popover'
import { KEY_CODES } from '@/core/core-keyboard'
import { OverlayContainer } from '@/core/core-popover'
import './Sidebar.css'

export default function Sidebar (props: SidebarProps): ReactElement {
  const {
    isOpen,
    setIsOpen,
    children,
    className,
    contentClassName,
    returnFocus
  } = props
  const [status, setStatus] = useState<SidebarStatus>(isOpen ? 'opened' : 'closed')

  function animationEndHandler (event: AnimationEvent): void {
    if (event.animationName === 'cfx-sidebar__fadein') {
      setStatus('opened')
    } else if (event.animationName === 'cfx-sidebar__fadeout') {
      setStatus('closed')
    }
  }

  function animationStartHandler (event: AnimationEvent): void {
    if (event.animationName === 'cfx-sidebar__fadein') {
      setStatus('opening')
    } else if (event.animationName === 'cfx-sidebar__fadeout') {
      setStatus('closing')
    }
  }

  function closeHandler (): void {
    setIsOpen(false)
  }

  const rootClassName = classNames(
    'c-sidebar',
    isOpen ? 'c-sidebar--opened' : 'c-sidebar--closed',
    className
  )
  const sidebarContentClassName = classNames('c-sidebar__content', contentClassName)

  const showSidebar = isOpen || status !== 'closed'
  return createPortal(showSidebar && (
    <OverlayContainer
      className={rootClassName}
      contentClassName={sidebarContentClassName}
      onAnimationStart={animationStartHandler}
      onAnimationEnd={animationEndHandler}
      onClose={closeHandler}
      dismissableKeyboardKeyFilters={[{ code: KEY_CODES.Escape }]}
      trap
      returnFocus={returnFocus}
      autoFocus={0}
    >
      {children}
    </OverlayContainer>
  ), popoverContainer)
}
