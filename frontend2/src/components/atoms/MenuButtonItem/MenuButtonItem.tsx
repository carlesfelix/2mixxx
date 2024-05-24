import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { MenuButtonItemProps } from './types'
import './MenuButtonItem.css'

function MenuButtonItemWithRef (
  props: MenuButtonItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const { children, className, onClick } = props

  const rootClassName = classNames(
    'g-font',
    'g-font--primary',
    'c-menu-button-item',
    'g-hide-default-focus-ring',
    className
  )

  return (
    <button
      className={rootClassName}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const MenuButtonItem = forwardRef(MenuButtonItemWithRef)
export default MenuButtonItem
