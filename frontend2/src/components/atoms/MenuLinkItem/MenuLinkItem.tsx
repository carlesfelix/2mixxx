import { Link } from '@/core/core-router'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef, ReactElement } from 'react'
import { MenuLinkItemProps } from './types'
import './MenuLinkItem.css'
import { useFocusHighlight } from '@/core/core-pointer-element'

function MenuLinkItemWithRef (
  props: MenuLinkItemProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, to, className, onClick } = props
  const { isHighlighted, focus, blur } = useFocusHighlight()

  const rootClassName = classNames(
    'MenuLinkItem',
    { 'MenuLinkItem--highlighted': isHighlighted },
    className
  )

  function focusHandler (event: FocusEvent): void {
    focus(event)
  }

  function blurHandler (): void {
    blur()
  }

  return (
    <Link
      className={rootClassName}
      to={to}
      ref={ref}
      onFocus={focusHandler}
      onBlur={blurHandler}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

const MenuLinkItem = forwardRef(MenuLinkItemWithRef)
export default MenuLinkItem
