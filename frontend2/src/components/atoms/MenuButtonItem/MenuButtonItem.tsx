import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { MenuButtonItemProps } from './types'
import './MenuButtonItem.css'
import { useInternalRef } from '@/core/core-hooks'

function MenuButtonItemWithRef (
  props: MenuButtonItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const { children, className, onClick } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'MenuButtonItem',
    { 'MenuButtonItem--highlighted': isHighlighted(internalRef) },
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
