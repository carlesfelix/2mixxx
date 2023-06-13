import useInternalRef from '@/core/core-hooks/useInternalRef'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
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
  const { isHighlighted } = useKeyboardAccessibility()
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
