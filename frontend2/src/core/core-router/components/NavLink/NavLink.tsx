import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import { NavLinkProps } from '../../types'

function NavLinkWithRef (
  props: NavLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const {
    children, to, className,
    activeClassName, end = true,
    onBlur, onFocus, onKeyDown
  } = props
  function classNameCallback (opts: { isActive: boolean }): string {
    const { isActive } = opts
    return classNames(
      'NavLink',
      isActive && activeClassName,
      className
    )
  }
  return (
    <ReactRouterNavLink
      to={to}
      className={classNameCallback}
      end={end}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
      onKeyDown={onKeyDown}
    >
      {children}
    </ReactRouterNavLink>
  )
}

const NavLink = forwardRef(NavLinkWithRef)

export default NavLink
