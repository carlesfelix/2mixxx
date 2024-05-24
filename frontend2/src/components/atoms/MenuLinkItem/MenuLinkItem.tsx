import { Link } from '@/core/core-router'
import classNames from 'classnames'
import type { ForwardedRef, KeyboardEvent, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { MenuLinkItemProps } from './types'
import { useInternalRef } from '@/core/core-hooks'
import './MenuLinkItem.css'

function MenuLinkItemWithRef (
  props: MenuLinkItemProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, to, className, onClick } = props
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'g-font',
    'g-font--primary',
    'c-menu-link-item',
    className
  )

  function keydownHandler (event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      event.preventDefault()
      internalRef.current?.click()
    }
  }

  return (
    <Link
      className={rootClassName}
      to={to}
      ref={refCallback}
      onClick={onClick}
      tabIndex={-1}
    >
      <span
        tabIndex={0}
        role="link"
        className="c-menu-link-item__wrapper g-hide-default-focus-ring"
        onKeyDown={keydownHandler}
      >
        {children}
      </span>
    </Link>
  )
}

const MenuLinkItem = forwardRef(MenuLinkItemWithRef)
export default MenuLinkItem
