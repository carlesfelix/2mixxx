import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import { type IconButtonProps } from './types'

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

  const rootClassName = classNames(
    'c-icon-button',
    'g-button',
    'g-button--icon',
    `g-button--icon-${color}`,
    `g-button--${size}`,
    'g-hide-default-focus-ring',
    className
  )

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={rootClassName}
      ref={ref}
    >
      {children}
    </button>
  )
}

const IconButton = forwardRef(IconButtonWithRef)
export default IconButton
