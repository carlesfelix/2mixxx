import { useFocusHighlight } from '@/core/core-pointer-element'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef, ReactElement } from 'react'
import { IconButtonProps } from './types'

function IconButtonWithRef (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const {
    children,
    className,
    color = 'current',
    size = 'md',
    onClick
  } = props
  const { isHighlighted, focus, blur } = useFocusHighlight()

  const rootClassName = classNames(
    'IconButton',
    '_button',
    '_button--icon',
    `_button--icon-${color}`,
    `_button--${size}`,
    { '_button--highlighted': isHighlighted },
    className
  )

  function focusHandler (event: FocusEvent): void {
    focus(event)
  }

  function blurHander (): void {
    blur()
  }

  return (
    <button
      onClick={onClick}
      onFocus={focusHandler}
      onBlur={blurHander}
      className={rootClassName}
      ref={ref}
    >
      {children}
    </button>
  )
}

const IconButton = forwardRef(IconButtonWithRef)
export default IconButton
