import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { OutlinedButtonProps } from './types'

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

  const rootClassName = classNames(
    'c-outlined-button',
    'g-button',
    'g-button--outlined',
    `g-button--outlined-${color}`,
    `g-button--${size}`,
    'g-focusable',
    className
  )

  return (
    <button
      onClick={onClick}
      className={rootClassName}
      ref={ref}
      tabIndex={0}
    >
      {children}
    </button>
  )
}

const OutlinedButton = forwardRef(OutlinedButtonWithRef)
export default OutlinedButton
