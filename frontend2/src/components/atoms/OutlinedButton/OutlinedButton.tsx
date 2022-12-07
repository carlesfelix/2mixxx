import { useFocusHighlight } from '@/core/core-pointer-element'
import classNames from 'classnames'
import { FocusEvent, ForwardedRef, forwardRef } from 'react'
import { OutlinedButtonProps } from './types'

function OutlinedButtonWithRef (
  props: OutlinedButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const {
    children,
    className,
    color = 'current',
    size = 'md',
    onClick
  } = props
  const { isHighlighted, focus, blur } = useFocusHighlight()

  const rootClassName = classNames(
    'OutlinedButton',
    '_button',
    '_button--outlined',
    `_button--outlined-${color}`,
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

const OutlinedButton = forwardRef(OutlinedButtonWithRef)
export default OutlinedButton
