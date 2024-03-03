import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { MenuButtonItemProps } from './types'
import { useInternalRef } from '@/core/core-hooks'
import './MenuButtonItem.css'

function MenuButtonItemWithRef (
  props: MenuButtonItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const { children, className, onClick } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'g-font',
    'g-font--primary',
    'c-menu-button-item',
    { 'c-menu-button-item--highlighted': isHighlighted(internalRef) },
    className
  )

  return (
    <button
      className={rootClassName}
      ref={refCallback}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const MenuButtonItem = forwardRef(MenuButtonItemWithRef)
export default MenuButtonItem
