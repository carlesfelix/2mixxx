import { Link } from '@/core/core-router'
import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { MenuLinkItemProps } from './types'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { useInternalRef } from '@/core/core-hooks'
import './MenuLinkItem.css'

function MenuLinkItemWithRef (
  props: MenuLinkItemProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, to, className, onClick } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'g-font',
    'g-font--primary',
    'c-menu-link-item',
    { 'c-menu-link-item--highlighted': isHighlighted(internalRef) },
    className
  )

  return (
    <Link
      className={rootClassName}
      to={to}
      ref={refCallback}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

const MenuLinkItem = forwardRef(MenuLinkItemWithRef)
export default MenuLinkItem
