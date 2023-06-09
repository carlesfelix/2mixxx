import { useInternalRef } from '@/core/core-hooks'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef, ReactElement } from 'react'
import { OutlinedButtonProps } from './types'

function OutlinedButtonWithRef (
  props: OutlinedButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const {
    children,
    className,
    color = 'current',
    size = 'md',
    onClick
  } = props
  const { isHighlighted, focus, blur } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'OutlinedButton',
    '_button',
    '_button--outlined',
    `_button--outlined-${color}`,
    `_button--${size}`,
    { '_button--highlighted': isHighlighted(internalRef) },
    className
  )

  function focusHandler (event: FocusEvent<HTMLButtonElement>): void {
    focus(event)
  }

  function blurHander (event: FocusEvent<HTMLButtonElement>): void {
    blur(event)
  }

  return (
    <button
      onClick={onClick}
      onFocus={focusHandler}
      onBlur={blurHander}
      className={rootClassName}
      ref={refCallback}
    >
      {children}
    </button>
  )
}

const OutlinedButton = forwardRef(OutlinedButtonWithRef)
export default OutlinedButton
