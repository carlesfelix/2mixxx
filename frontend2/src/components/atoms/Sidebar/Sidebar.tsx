import { useKeyBoard } from '@/core/core-hooks'
import classNames from 'classnames'
import {
  type AnimationEvent,
  type MouseEvent,
  type ReactElement,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { type SidebarProps, type SidebarStatus } from './types'
import { popoverContainer } from '@/modules/popover'
import { FocusContainer } from '@/core/core-focus'
import { KEY_CODES } from '@/core/core-keyboard'
import './Sidebar.css'

export default function Sidebar (props: SidebarProps): ReactElement {
  const {
    isOpen,
    setIsOpen,
    children,
    className,
    contentClassName
  } = props
  const [status, setStatus] = useState<SidebarStatus>(isOpen ? 'opened' : 'closed')
  const sidebarContentRef = useRef<HTMLDivElement>(null)

  useKeyBoard({
    listener (event) {
      setIsOpen(false)
    },
    code: KEY_CODES.Escape,
    listen: isOpen
  })

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

  function clickHandler (event: MouseEvent<HTMLDivElement>): void {
    if (
      !sidebarContentRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  const rootClassName = classNames(
    'c-sidebar',
    isOpen ? 'c-sidebar--opened' : 'c-sidebar--closed',
    className
  )
  const sidebarContentClassName = classNames('c-sidebar__content', contentClassName)

  const showSidebar = isOpen || status !== 'closed'
  return createPortal(showSidebar && (
    <div
      className={rootClassName}
      onAnimationStart={animationStartHandler}
      onAnimationEnd={animationEndHandler}
      onClick={clickHandler}
    >
      <FocusContainer className="c-sidebar__wrapper" trap returnFocus autoFocus={0}>
        <div className="c-sidebar__mask" />
        <div className={sidebarContentClassName} ref={sidebarContentRef}>
          {children}
        </div>
      </FocusContainer>
    </div>
  ), popoverContainer)
}
