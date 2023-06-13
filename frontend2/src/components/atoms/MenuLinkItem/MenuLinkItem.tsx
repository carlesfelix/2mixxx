import { Link } from '@/core/core-router'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { MenuLinkItemProps } from './types'
import './MenuLinkItem.css'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import { useInternalRef } from '@/core/core-hooks'

function MenuLinkItemWithRef (
  props: MenuLinkItemProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, to, className, onClick } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'MenuLinkItem',
    { 'MenuLinkItem--highlighted': isHighlighted(internalRef) },
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
