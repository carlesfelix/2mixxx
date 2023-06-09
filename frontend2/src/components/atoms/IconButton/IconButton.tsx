import useInternalRef from '@/core/core-hooks/useInternalRef'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
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
    onClick,
    onKeyDown
  } = props
  const { isHighlighted, focus, blur } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'IconButton',
    '_button',
    '_button--icon',
    `_button--icon-${color}`,
    `_button--${size}`,
    { '_button--highlighted': isHighlighted(internalRef) },
    className
  )

  function focusHandler (event: FocusEvent<HTMLElement>): void {
    focus(event)
  }

  function blurHander (event: FocusEvent<HTMLElement>): void {
    blur(event)
  }

  return (
    <button
      onClick={onClick}
      onFocus={focusHandler}
      onBlur={blurHander}
      onKeyDown={onKeyDown}
      className={rootClassName}
      ref={refCallback}
    >
      {children}
    </button>
  )
}

const IconButton = forwardRef(IconButtonWithRef)
export default IconButton
