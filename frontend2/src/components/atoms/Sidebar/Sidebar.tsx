import useOverlayRootElement from '@/hooks/useOverlayRootElement'
import classNames from 'classnames'
import {
  AnimationEvent,
  KeyboardEvent,
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
    children,
    className,
    contentClassName,
    onClose
  } = props
  const [status, setStatus] = useState<SidebarStatus>(isOpen ? 'opened' : 'closed')
  const overlayRootElement = useOverlayRootElement()
  const sidebarContentRef = useRef<HTMLDivElement>(null)

  function animationEndHandler (event: AnimationEvent): void {
    if (event.animationName === 'Sidebar__fadein') {
      setStatus('opened')
    } else if (event.animationName === 'Sidebar__fadeout') {
      setStatus('closed')
    }
  }

  function animationStartHandler (event: AnimationEvent): void {
    if (event.animationName === 'Sidebar__fadein') {
      setStatus('opening')
    } else if (event.animationName === 'Sidebar__fadeout') {
      setStatus('closing')
    }
  }

  function clickHandler (event: MouseEvent<HTMLDivElement>): void {
    if (
      !sidebarContentRef.current?.contains(event.target as Node)
    ) {
      onClose && onClose()
    }
  }

  function keydownHandler (event: KeyboardEvent<HTMLDivElement>): void {
    if (event.code === 'Escape') {
      onClose && onClose()
    }
  }

  const rootClassName = classNames(
    'Sidebar',
    {
      'Sidebar--opened': isOpen,
      'Sidebar--closed': !isOpen
    },
    className
  )
  const sidebarContentClassName = classNames('Sidebar__content', contentClassName)

  const showSidebar = isOpen || status !== 'closed'
  return createPortal((
    showSidebar && (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={rootClassName}
        onAnimationStart={animationStartHandler}
        onAnimationEnd={animationEndHandler}
        onClick={clickHandler}
        onKeyDown={keydownHandler}
      >
        <div className="Sidebar__mask"></div>
        <SidebarContent className={sidebarContentClassName} ref={sidebarContentRef}>
          {children}
        </SidebarContent>
      </div>
    )
  ), overlayRootElement)
}
