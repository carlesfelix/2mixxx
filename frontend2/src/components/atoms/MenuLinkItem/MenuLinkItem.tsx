import { Link } from '@/core/core-router'
import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { MenuLinkItemProps } from './types'
import './MenuLinkItem.css'

function MenuLinkItemWithRef (
  props: MenuLinkItemProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, to, className, onClick } = props

  const rootClassName = classNames(
    'g-font',
    'g-font--primary',
    'c-menu-link-item',
    'g-focusable',
    className
  )

  return (
    <Link
      className={rootClassName}
      to={to}
      ref={ref}
      onClick={onClick}
      tabIndex={0}
    >
      {children}
    </Link>
  )
}

const MenuLinkItem = forwardRef(MenuLinkItemWithRef)
export default MenuLinkItem
