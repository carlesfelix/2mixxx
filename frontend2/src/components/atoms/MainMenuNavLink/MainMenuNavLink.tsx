import { NavLink } from '@/core/core-router'
import classNames from 'classnames'
import type { KeyboardEvent, ReactElement } from 'react'
import { useRef } from 'react'
import type { MainMenuNavLinkProps } from './types'
import './MainMenuNavLink.css'

export default function MainMenuNavLink (
  props: MainMenuNavLinkProps
): ReactElement {
  const { icon, label, to } = props
  const ref = useRef<HTMLAnchorElement | null>(null)
  const rootClassName = classNames('c-main-menu-nav-link', 'g-hide-default-focus-ring')

  function keydownHandler (event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      event.preventDefault()
      ref.current?.click()
    }
  }
  return (
    <NavLink
      to={to}
      className={rootClassName}
      activeClassName="c-main-menu-nav-link--active"
      ref={ref}
      tabIndex={-1}
    >
      <span
        tabIndex={0}
        role="link"
        className="c-main-menu-nav-link__wrapper g-hide-default-focus-ring"
        onKeyDown={keydownHandler}
      >
        <span className="c-main-menu-nav-link__icon">
          {icon}
        </span>
        <span className="c-main-menu-nav-link__label">
          {label}
        </span>
      </span>
    </NavLink>
  )
}
