import { useFocusHighlight } from '@/core/core-pointer-element'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef, ReactElement } from 'react'
import { MenuButtonItemProps } from './types'
import './MenuButtonItem.css'

function MenuButtonItemWithRef (
  props: MenuButtonItemProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const { children, className, onClick, onBlur, onFocus } = props
  const { isHighlighted, focus, blur } = useFocusHighlight()

  function focusHandler (event: FocusEvent<HTMLButtonElement>): void {
    focus(event)
    onFocus && onFocus(event)
  }

  function blurHander (event: FocusEvent<HTMLButtonElement>): void {
    blur()
    onBlur && onBlur(event)
  }

  const rootClassName = classNames(
    'MenuButtonItem',
    { 'MenuButtonItem--highlighted': isHighlighted },
    className
  )

  return (
    <button
      className={rootClassName}
      ref={ref}
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
