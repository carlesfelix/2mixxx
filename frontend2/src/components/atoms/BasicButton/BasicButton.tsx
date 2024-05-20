import classNames from 'classnames'
import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import type { BasicButtonProps } from './types'

function BasicButtonWithRef (
  props: BasicButtonProps,
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
    'c-basic-button',
    'g-button',
    'g-button--basic',
    `g-button--basic-${color}`,
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

const BasicButton = forwardRef(BasicButtonWithRef)
export default BasicButton
