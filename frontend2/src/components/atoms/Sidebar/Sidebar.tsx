import { useKeyBoard } from '@/core/core-hooks'
import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'
import useOverlayRootElement from '@/hooks/useOverlayRootElement'
import classNames from 'classnames'
import {
  AnimationEvent,
  MouseEvent,
  ReactElement,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import SidebarContent from './components/SidebarContent'
import './Sidebar.css'
import { SidebarProps, SidebarStatus } from './types'

export default function Sidebar (props: SidebarProps): ReactElement {
  const {
    isOpen,
    setIsOpen,
    children,
    className,
    contentClassName
  } = props
  const [status, setStatus] = useState<SidebarStatus>(isOpen ? 'opened' : 'closed')
  const overlayRootElement = useOverlayRootElement()
  const sidebarContentRef = useRef<HTMLDivElement>(null)

  useKeyBoard({
    listener () {
      setIsOpen(false)
    },
    code: 'Escape',
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
  return createPortal((
    showSidebar && (
      <div
        className={rootClassName}
        onAnimationStart={animationStartHandler}
        onAnimationEnd={animationEndHandler}
        onClick={clickHandler}
        tabIndex={-1}
      >
        <FocusWithKeyboard className="c-sidebar__wrapper">
          <div className="c-sidebar__mask" />
          <SidebarContent className={sidebarContentClassName} ref={sidebarContentRef}>
            {children}
          </SidebarContent>
        </FocusWithKeyboard>
      </div>
    )
  ), overlayRootElement)
}
