import useOverlayRootElement from "@/hooks/useOverlayRootElement";
import classNames from "classnames";
import { AnimationEvent, useState } from "react";
import { createPortal } from "react-dom";
import './Sidebar.css';
import { SidebarProps, SidebarStatus } from "./types";

export default function Sidebar(props: SidebarProps) {
  const { isOpen, children, className } = props;
  const [ status, setStatus ] = useState<SidebarStatus>(isOpen ? 'opened' : 'closed');
  const overlayRootElement = useOverlayRootElement();

  function animationEndHandler(event: AnimationEvent): void {
    if (event.animationName === 'Sidebar__fadein') {
      setStatus('opened');
    } else if (event.animationName === 'Sidebar__fadeout') {
      setStatus('closed');
    }
  }

  function animationStartHandler(event: AnimationEvent): void {
    if (event.animationName === 'Sidebar__fadein') {
      setStatus('opening');
    } else if (event.animationName === 'Sidebar__fadeout') {
      setStatus('closing');
    }
  }

  const rootClassName = classNames(
    'Sidebar',
    {
      'Sidebar--opened': isOpen,
      'Sidebar--closing': !isOpen
    },
    className
  );

  const showSidebar = isOpen || status !== 'closed';
  return createPortal((
    showSidebar && (
      <div
        className={rootClassName}
        onAnimationStart={animationStartHandler}
        onAnimationEnd={animationEndHandler}
      >
        {children}
      </div>
    )
  ), overlayRootElement); 
}
