import { useInternalRef } from '@/core/core-hooks'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
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
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'c-outlined-button',
    'g-button',
    'g-button--outlined',
    `g-button--outlined-${color}`,
    `g-button--${size}`,
    { 'g-button--highlighted': isHighlighted(internalRef) },
    className
  )

  return (
    <button
      onClick={onClick}
      className={rootClassName}
      ref={refCallback}
    >
      {children}
    </button>
  )
}

const OutlinedButton = forwardRef(OutlinedButtonWithRef)
export default OutlinedButton
