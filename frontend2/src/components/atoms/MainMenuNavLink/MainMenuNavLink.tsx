import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { NavLink } from '@/core/core-router'
import classNames from 'classnames'
import { ReactElement, useRef } from 'react'
import './MainMenuNavLink.css'
import { MainMenuNavLinkProps } from './types'

export default function MainMenuNavLink (
  props: MainMenuNavLinkProps
): ReactElement {
  const { icon, label, to, onKeyDown } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const ref = useRef<HTMLAnchorElement | null>(null)
  const rootClassName = classNames(
    'c-main-menu-nav-link',
    { 'c-main-menu-nav-link--highlighted': isHighlighted(ref) }
  )
  return (
    <NavLink
      to={to}
      className={rootClassName}
      activeClassName="c-main-menu-nav-link--active"
      ref={ref}
      onKeyDown={onKeyDown}
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
