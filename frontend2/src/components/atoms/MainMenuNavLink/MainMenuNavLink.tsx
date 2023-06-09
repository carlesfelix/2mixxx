import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { NavLink } from '@/core/core-router'
import classNames from 'classnames'
import { FocusEvent, ReactElement, useRef } from 'react'
import './MainMenuNavLink.css'
import { MainMenuNavLinkProps } from './types'

export default function MainMenuNavLink (
  props: MainMenuNavLinkProps
): ReactElement {
  const { icon, label, to, onKeyDown } = props
  const { isHighlighted, focus, blur } = useKeyboardAccessibility()
  const ref = useRef<HTMLAnchorElement | null>(null)
  function focusHandler (event: FocusEvent<HTMLAnchorElement>): void {
    focus(event)
  }
  function blurHandler (event: FocusEvent<HTMLAnchorElement>): void {
    blur(event)
  }
  const rootClassName = classNames(
    'MainMenuNavLink',
    { 'MainMenuNavLink--highlighted': isHighlighted(ref) }
  )
  return (
    <NavLink
      to={to}
      className={rootClassName}
      activeClassName="MainMenuNavLink--active"
      onBlur={blurHandler}
      onFocus={focusHandler}
      ref={ref}
      onKeyDown={onKeyDown}
    >
      <span className="MainMenuNavLink__icon">
        {icon}
      </span>
      <span className="MainMenuNavLink__label">
        {label}
      </span>
    </NavLink>
  )
}
