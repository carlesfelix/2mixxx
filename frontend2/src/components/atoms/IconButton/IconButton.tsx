import useInternalRef from '@/core/core-hooks/useInternalRef'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
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
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'c-icon-button',
    'g-button',
    'g-button--icon',
    `g-button--icon-${color}`,
    `g-button--${size}`,
    { 'g-button--highlighted': isHighlighted(internalRef) },
    className
  )

  return (
    <button
      onClick={onClick}
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
