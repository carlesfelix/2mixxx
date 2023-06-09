import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef, ReactElement } from 'react'
import { MenuButtonItemProps } from './types'
import './MenuButtonItem.css'
import { useInternalRef } from '@/core/core-hooks'

function MenuButtonItemWithRef (
  props: MenuButtonItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const { children, className, onClick, onBlur, onFocus } = props
  const { isHighlighted, focus, blur } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  function focusHandler (event: FocusEvent<HTMLButtonElement>): void {
    focus(event)
    onFocus && onFocus(event)
  }

  function blurHander (event: FocusEvent<HTMLButtonElement>): void {
    blur(event)
    onBlur && onBlur(event)
  }

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
      onFocus={focusHandler}
      onBlur={blurHander}
    >
      {children}
    </button>
  )
}

const MenuButtonItem = forwardRef(MenuButtonItemWithRef)
export default MenuButtonItem
