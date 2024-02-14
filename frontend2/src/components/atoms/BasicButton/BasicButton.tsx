import { useInternalRef } from '@/core/core-hooks'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { BasicButtonProps } from './types'

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
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'c-basic-button',
    'g-button',
    'g-button--basic',
    `g-button--basic-${color}`,
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

const BasicButton = forwardRef(BasicButtonWithRef)
export default BasicButton
