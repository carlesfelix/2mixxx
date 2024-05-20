import { NavLink } from '@/core/core-router'
import classNames from 'classnames'
import type { ReactElement } from 'react'
import { useRef } from 'react'
import './MainMenuNavLink.css'
import type { MainMenuNavLinkProps } from './types'

export default function MainMenuNavLink (
  props: MainMenuNavLinkProps
): ReactElement {
  const { icon, label, to, onKeyDown, onClick } = props
  const ref = useRef<HTMLAnchorElement | null>(null)
  const rootClassName = classNames('c-main-menu-nav-link', 'g-focusable')
  return (
    <NavLink
      to={to}
      className={rootClassName}
      activeClassName="c-main-menu-nav-link--active"
      ref={ref}
      onKeyDown={onKeyDown}
      onClick={onClick}
      tabIndex={0}
    >
      <span className="c-main-menu-nav-link__icon">
        {icon}
      </span>
      <span className="c-main-menu-nav-link__label">
        {label}
      </span>
    </NavLink>
  )
}
